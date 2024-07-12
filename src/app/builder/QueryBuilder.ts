/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);

    if (queryObj.price) {
      const priceFilter: any = {};
      const priceRange = (queryObj.price as string).split('-');

      if (priceRange.length === 1 && priceRange[0].split('+')) {
        // Handle "min+" format
        priceFilter.$gte = Number(priceRange[0].replace('+', ''));
      } else if (priceRange.length === 1 && priceRange[0].endsWith('-')) {
        // Handle "max-" format
        priceFilter.$lte = Number(priceRange[0].replace('-', ''));
      } else if (priceRange.length === 2) {
        // Handle "min-max" format
        if (priceRange[0]) priceFilter.$gte = Number(priceRange[0]);
        if (priceRange[1]) priceFilter.$lte = Number(priceRange[1]);
      }

      queryObj.price = priceFilter;
    }

    // Handle categories filter
    if (queryObj.category) {
      queryObj.category = { $in: queryObj.category };
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sortOption = this.query.sort as string | undefined;
    let sort = 'price';
    if (sortOption) {
      const [field, order] = sortOption.split(':');
      sort = `${order === 'desc' ? '-' : ''}${field}`;
    }
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
}

export default QueryBuilder;
