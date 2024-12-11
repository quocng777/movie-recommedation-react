export type Response<T> = {
    statusCode: number,
    message: string,
    data?: T,
    timestamp: Date,
};

export type Pagination = {
    totalRecords: number,
    totalPages: number,
    currentPage: number,
}