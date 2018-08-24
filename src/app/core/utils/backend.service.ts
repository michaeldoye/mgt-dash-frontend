import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private apollo: Apollo) { }

  public getSets(filter: string): Observable<ApolloQueryResult<any>> {
    const allSetsQ = gql`
      query {
        setData(key: "${filter}") {
          type
          name
          releaseDate
          code
        }
      }
    `;
    return this.apollo.watchQuery({query: allSetsQ}).valueChanges;
  }

  public getCardsBySetName(setName: string, pageSize: number, page: number): Observable<ApolloQueryResult<any>>  {
    const cardsBySetQ = gql`
      query {
        cardsBySet(set: "${setName}", pageSize: ${pageSize}, page: ${page}) {
          cardData {
            name
            set
            imageUrl
            colors
            colorIdentity
            manaCost
            power
            toughness
            text
            type
            types
            subtypes
            rarity
            isSelected
            rulings {
              date
              text
            }
          }
          setData {
            type
            name
            releaseDate
            block
            code
          }
          totalCards
        }
      }
    `;
    return this.apollo.watchQuery({query: cardsBySetQ}).valueChanges
      .pipe(map((data) => {
        const clonedObj = JSON.stringify(data);
        return JSON.parse(clonedObj);
      }));
  }

  getNewsFeed(): Observable<ApolloQueryResult<any>> {
    const news = gql`
      query {
        getNewsFeed {
          title
          items {
            title
            image
            link
            contentSnippet
            content
            pubDate
          }
        }
      }
    `;
    return this.apollo.watchQuery({query: news}).valueChanges;
  }
}

