class Store {
  constructor(
    id,
    title,
    image,
    description,
    type,
    address,
    city,
    country,
    sellerId,
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.type = type;
    this.address = address;
    this.city = city;
    this.country = country;
    this.sellerId = sellerId;
  }
}

export default Store;
