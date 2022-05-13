interface DataAccessLayer {
    read<T>(type: T): T;
    readOne<T>(type: T, id: string): T;
}