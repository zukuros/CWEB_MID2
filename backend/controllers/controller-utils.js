import {Op} from 'sequelize';

/**
 * Used in controllers to build find options with pagination properties
 * @param filter
 * @param defaultSize 4
 * @param defaultPage 1
 * @returns {{limit: number, offset: number}}
 */
export const buildFindWithPagination = (filter,defaultSize=4,defaultPage=1)=>{
    //build find options object with pagination limits
    //expect "page" and "limit" from filter query string
    const pageNum = Math.abs(parseInt(filter.page)) || defaultPage ;
    const pageSize = Math.abs(parseInt(filter.limit)) || defaultSize ;
    const findOptions = {
        limit: pageSize, // maximum number of items to return with this query
        offset: (pageNum -1) * pageSize, // number of items to skip before returning this query
    }
    return findOptions
}

/**
 * Used in controllers to build find options with where like clauses
 * @param filter
 * @param allowedKeys
 * @returns {key:{[Op.like]: `%<partail search string>%`}}
 */
export const buildWhereLike = (filter,allowedKeys)=>{
    const whereClause = {};
    const filterKeys = Object.keys(filter) // look for allowed movie keys
        .filter(val => allowedKeys.includes(val) );
    for(const key of filterKeys){ // build the where statement
        whereClause[key] = {[Op.like]: `%${filter[key]}%`};//create a where like clause in the SQL statement
        // eg select(*) from movies where title like '%<partial search string>%'
    }
    return whereClause;
}

/**
 * Used in controllers to build a paged result to return to the api endpoint
 * @param arrayKey
 * @param rows
 * @param totalCount
 * @param findOptions
 * @returns {{key:[object], totalCount, pageSize: (*|number|string), totalPageCount: number}}
 */
export const buildPaginationResult = (arrayKey,rows,totalCount,findOptions)=>{
    const pageSize = findOptions.limit;
    const totalPageCount= Math.ceil(totalCount / pageSize)
    return { [arrayKey]:rows, totalCount, pageSize, totalPageCount };
}