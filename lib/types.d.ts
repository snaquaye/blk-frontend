export type Category = "Books" | "Culture" | "Film + TV";

export type ArticleType = "Review Post" | "Recommendation List" | "Long Post";

export interface Author {
    id: string;
    documentId: string;
    name: string;
    bio: string;
    profilePicture?: StrapiImage;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface LiteraryTrope {
    id: number;
    title: string;
}

export interface Review {
    id: number;
    title: string;
    reviewType: "Book" | "Film  + TV";
    rating: string;
    genre: string;
    blurb: string;
    initialReaction: string;
    finalReview?: string;
    literaryTropes?: LiteraryTrope[];
    waterstoneLink?: string;
    amazoneLink?: string;
    amazonPrimeLink?: string;
    netflixLink?: string;
}

export interface Recommendation {
    id:          number;
    title:       string;
    listType:    string;
    blurb:       null;
    myThoughts:  null;
    content:     BlocksContent;
    trailerLink: string;
    availableOn: AvailableOn[];
    image:       StrapiImage;
    genre:       string;
    rating:      string;
}

export interface AvailableOn {
    plateform: { name: string };
    link: string;
}

export interface Article {
    id:                     number;
    documentId:             string;
    articleTitle:           string;
    slug:                   string;
    availableOn:            AvailableOn[];
    articleType:            ArticleType;
    genre:                  Genre[];
    coverImage:             CoverImage[];
    category:               Category;
    excerpt:                Content;
    isFeaturedPost:         boolean;
    recommendationList:     Recommendation[];
    review?:                Review;
    content:                BlocksContent;
    createdAt:              Date;
    updatedAt:              Date;
    publishedAt:            Date;
    createdBy:              CreatedBy;
    updatedBy:              CreatedBy;
    locale:                 string;
    localizations:          CreatedBy[];
    author:                 Author;
    description:            string;
    tags:                   Tag[];
}

export interface ArticleElement {
    id:             number;
    documentId:     Content;
    articleTitle:          Content;
    slug:           Content;
    articleType:    string;
    genre:          Genre[];
    coverImage:     CoverImage[];
    category:       CreatedBy;
    excerpt:        Content;
    isFeaturedPost: boolean;
    list_items:     Category[];
    content:        Content;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    createdBy:      CreatedBy;
    updatedBy:      CreatedBy;
    locale:         Content;
    localizations:  CreatedBy[];
}

export interface Category {
    id:            number;
    documentId:    Content;
    title?:        Content;
    slug?:         Content;
    articles?:     ArticleElement[];
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    createdBy:     CreatedBy;
    updatedBy:     CreatedBy;
    locale:        Content;
    localizations: CreatedBy[];
    article?:      CreatedBy;
    Items?:        Item[];
}

export interface CreatedBy {
    id:         number;
    documentId: Content;
}

export enum Content {
    String = "string",
}

export interface Genre {
    id: number;
}
export interface CoverImage {
    id: number;
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
}

export interface ImageSrc {
    id:                number;
    documentId:        Content;
    name:              Content;
    alternativeText:   Content;
    caption:           Content;
    width:             number;
    height:            number;
    formats:           Content;
    hash:              Content;
    ext:               Content;
    mime:              Content;
    size:              number;
    url:               Content;
    previewUrl:        Content;
    provider:          Content;
    provider_metadata: Content;
    related:           CreatedBy[];
    folder:            Folder;
    folderPath:        Content;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
    createdBy:         CreatedBy;
    updatedBy:         CreatedBy;
    locale:            Content;
    localizations:     CreatedBy[];
}

export interface Folder {
    id:            number;
    documentId:    Content;
    name:          Content;
    pathId:        number;
    parent:        CreatedBy;
    children:      CreatedBy[];
    files:         File[];
    path:          Content;
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    createdBy:     CreatedBy;
    updatedBy:     CreatedBy;
    locale:        Content;
    localizations: CreatedBy[];
}

export interface File {
    id:                number;
    documentId:        Content;
    name:              Content;
    alternativeText:   Content;
    caption:           Content;
    width:             number;
    height:            number;
    formats:           Content;
    hash:              Content;
    ext:               Content;
    mime:              Content;
    size:              number;
    url:               Content;
    previewUrl:        Content;
    provider:          Content;
    provider_metadata: Content;
    related:           CreatedBy[];
    folder:            CreatedBy;
    folderPath:        Content;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
    createdBy:         PurpleCreatedBy;
    updatedBy:         CreatedBy;
    locale:            Content;
    localizations:     CreatedBy[];
}

export interface PurpleCreatedBy {
    id:                 number;
    documentId:         Content;
    firstname:          Content;
    lastname:           Content;
    username:           Content;
    email:              string;
    resetPasswordToken: Content;
    registrationToken:  Content;
    isActive:           boolean;
    roles:              Role[];
    blocked:            boolean;
    preferedLanguage:   Content;
    createdAt:          Date;
    updatedAt:          Date;
    publishedAt:        Date;
    createdBy:          CreatedBy;
    updatedBy:          CreatedBy;
    locale:             Content;
    localizations:      CreatedBy[];
}

export interface Role {
    id:            number;
    documentId:    Content;
    name:          Content;
    code:          Content;
    description:   Content;
    users:         CreatedBy[];
    permissions:   Permission[];
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    createdBy:     CreatedBy;
    updatedBy:     CreatedBy;
    locale:        Content;
    localizations: CreatedBy[];
}

export interface Permission {
    id:               number;
    documentId:       Content;
    action:           Content;
    actionParameters: Content;
    subject:          Content;
    properties:       Content;
    conditions:       Content;
    role:             CreatedBy;
    createdAt:        Date;
    updatedAt:        Date;
    publishedAt:      Date;
    createdBy:        CreatedBy;
    updatedBy:        CreatedBy;
    locale:           Content;
    localizations:    CreatedBy[];
}

export interface Item {
    id:              number;
    Title:           Content;
    ListType:        string;
    Image:           Image;
    AmazonLink:      Content;
    WaterstoneLink:  Content;
    Blurb:           Content;
    MyThoughts:      Content;
    Content:         Content;
    AmazonPrimeLink: Content;
    Netflix:         Content;
    TrailerLink:     Content;
}

export interface Homepage {
    id:                number;
    documentId:        Description;
    description:       Description;
    exploreCategories: ExploreCategory[];
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
    createdBy:         CreatedBy;
    updatedBy:         CreatedBy;
    locale:            Description;
    localizations:     ExploreCategory[];
}

export enum Description {
    String = "string",
}

export interface ExploreCategory {
    id:                 number;
    documentId:         Description;
    title?:             Description;
    slug?:              Description;
    articles?:          Article[];
    createdAt:          Date;
    updatedAt:          Date;
    publishedAt:        Date;
    createdBy:          CreatedBy;
    updatedBy:          CreatedBy;
    locale:             Description;
    localizations:      CreatedBy[];
    article?:           CreatedBy;
    Items?:             Item[];
    description?:       Description;
    exploreCategories?: CreatedBy[];
}

export interface Genre {
    id: number;
}


export interface ImageSrc {
    id:                number;
    documentId:        Description;
    name:              Description;
    alternativeText:   Description;
    caption:           Description;
    width:             number;
    height:            number;
    formats:           Description;
    hash:              Description;
    ext:               Description;
    mime:              Description;
    size:              number;
    url:               Description;
    previewUrl:        Description;
    provider:          Description;
    provider_metadata: Description;
    related:           CreatedBy[];
    folder:            Folder;
    folderPath:        Description;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
    createdBy:         CreatedBy;
    updatedBy:         CreatedBy;
    locale:            Description;
    localizations:     CreatedBy[];
}

export interface Folder {
    id:            number;
    documentId:    Description;
    name:          Description;
    pathId:        number;
    parent:        CreatedBy;
    children:      CreatedBy[];
    files:         File[];
    path:          Description;
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    createdBy:     CreatedBy;
    updatedBy:     CreatedBy;
    locale:        Description;
    localizations: CreatedBy[];
}

export interface File {
    id:                number;
    documentId:        Description;
    name:              Description;
    alternativeText:   Description;
    caption:           Description;
    width:             number;
    height:            number;
    formats:           Description;
    hash:              Description;
    ext:               Description;
    mime:              Description;
    size:              number;
    url:               Description;
    previewUrl:        Description;
    provider:          Description;
    provider_metadata: Description;
    related:           CreatedBy[];
    folder:            CreatedBy;
    folderPath:        Description;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
    createdBy:         PurpleCreatedBy;
    updatedBy:         CreatedBy;
    locale:            Description;
    localizations:     CreatedBy[];
}

export interface Role {
    id:            number;
    documentId:    Description;
    name:          Description;
    code:          Description;
    description:   Description;
    users:         CreatedBy[];
    permissions:   Permission[];
    createdAt:     Date;
    updatedAt:     Date;
    publishedAt:   Date;
    createdBy:     CreatedBy;
    updatedBy:     CreatedBy;
    locale:        Description;
    localizations: CreatedBy[];
}

export interface Permission {
    id:               number;
    documentId:       Description;
    action:           Description;
    actionParameters: Description;
    subject:          Description;
    properties:       Description;
    conditions:       Description;
    role:             CreatedBy;
    createdAt:        Date;
    updatedAt:        Date;
    publishedAt:      Date;
    createdBy:        CreatedBy;
    updatedBy:        CreatedBy;
    locale:           Description;
    localizations:    CreatedBy[];
}

export interface Item {
    id:              number;
    Title:           Description;
    ListType:        string;
    Image:           Image;
    AmazonLink:      Description;
    WaterstoneLink:  Description;
    Blurb:           Description;
    MyThoughts:      Description;
    Content:         Description;
    AmazonPrimeLink: Description;
    Netflix:         Description;
    TrailerLink:     Description;
}

export interface StapiImage {
    id:                number;
    documentId:        Description;
    name:              Description;
    alternativeText:   Description;
    caption:           Description;
    width:             number;
    height:            number;
    formats:           Description;
    hash:              Description;
    ext:               Description;
    mime:              Description;
    size:              number;
    url:               Description;
    previewUrl:        Description;
    provider:          Description;
    provider_metadata: Description;
    related:           CreatedBy[];
    folder:            CreatedBy;
    folderPath:        Description;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
    createdBy:         CreatedBy;
    updatedBy:         CreatedBy;
    locale:            Description;
    localizations:     CreatedBy[];
}
