import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { InputBook } from './dto/book.input';
import { v4 as uuidv4 } from 'uuid';

@Resolver('Book')
export class BookResolver {
  private books: Book[] = [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      name: 'BeforeSecond',
      price: 199,
      ownerName: 'shacript',
    },
  ];

  @Query((returns) => [Book])
  getBooks(): Book[] {
    return this.books;
  }

  @Query((returns) => Book)
  getBook(@Args('id', { type: () => String }) id: string): Book {
    return this.books.find((book) => book.id === id);
  }

  @Query((returns) => [Book])
  getMyBook(_, __, { headers }): Book[] {
    return this.books.filter((book) => book.ownerName === headers.ownername);
  }

  @Mutation((returns) => Book)
  createBook(@Args('input') input: InputBook, @Context() { headers }): Book {
    const result: Book = {
      id: uuidv4(),
      ...input,
      ownerName: headers.ownername,
    };
    this.books.push(result);
    return result;
  }
}
