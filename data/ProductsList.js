import Product from "../models/Product";



// id,
// categoryId,
// title,
// description,
// price,
// priceType,
// imageUrl,
// promotionRate,
// location,
// additionaDetails,
// storeId,

const PRODUCTS = [
    new Product(1, 1,'Hot Women cloths', 'دوسية Digital بلاستيك PVC لوكس بجراب A4',  15, 'Fixed' , 'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/4/5/4501005011002.jpg', 25, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product(2, 1,'Hot men cloths', 'حافظة بلاستيك بكبسولة مقاس FC رقم W-209',  15, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/4/5/4500900010209.jpg', '', 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product(3, 3,'رزمة ورق تصوير', 'رزمة ورق تصوير متعدد 80 جم / 500 غلاف فضىPREMIUM WHITE M.P',85, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/4/5/4506520311867.jpg', 25, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product(4, 4,'الة حاسبة', 'الة حاسبة CASIO رقم FX-82ARX',325, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/5/0/5010060093725.jpg', 10, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product(5, 5,'علبة دبابيش دباسة', 'علبة دبوس دباسة ابيض 1M- Jaguar رقم 24/6',12, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/5/1/5132800108001.jpg', '', 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product(6, 6,'ماكينة عد نقدية', 'ماكينة عد نقدية + كشف العملة + الحبر المعناطيسى 8003D',1250, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/0/9/0911800008003.jpg', 25, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product (7,7,'رزمة ورق تصوير 80 جرام', 'رزمة ورق تصوير 80 جرام Double A- A4 /500',89, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/2/9/29400080500.jpg', '', 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product (8,8,'باكو فواصل ديجيتال بلاستيك', 'باكو فواصل ديجيتال بلاستيك 10لسان A4ملونة بدون ارق',25, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/4/5/4501706110001_1.jpg', 15, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product (9,1,'طقم مكتب خشب', 'طقم مكتب خشب 6قطعة RABBET جوز رقم 6103FDX',1025, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/1/1/11300010626103_4.jpg', 10, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product (10,2,'سبورة بيضاء للاطفال', 'سبورة بيضاء للاطفال فريم بلاستيك مقاس 25*35سم KB - 702 PL',25, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/5/0/502008010250702_2.jpg', '', 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    new Product (11,3,'سبورة بيضاء ممغنطة', 'سبورة بيضاء ممغنطة داتا زون مقاس30*45 سم WH101AMZ',125, 'Fixed' ,  'https://www.samirandaly.com/media/catalog/product/cache/9a16983b747c72d87d73d7e4f1bd65fd/5/0/502000030045101_2.jpg', 30, 'Maadi', 'Home delivery available - Cash on Delivery is also available', 1, 'store1' ),
    
];

export default PRODUCTS;