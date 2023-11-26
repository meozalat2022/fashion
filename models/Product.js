class Product {
  constructor(
    id,
    categoryId,
    title,
    description,
    price,
    priceType,
    imageUrl,
    promotionRate,
    location,
    additionaDetails,
    storeId,
    // storeName,
    // storeImage,
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.priceType = priceType;
    this.imageUrl = imageUrl;
    this.promotionRate = promotionRate;
    // this.hasPromotion = hasPromotion;
    this.location = location;
    this.additionaDetails = additionaDetails;
    this.storeId = storeId;
    // this.storeName = storeName;
    // this.storeImage = storeImage;
  }
}

export default Product;
