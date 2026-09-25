var productGallery=[
  ["assets/images/brand/rapha-founder-photo.png","Rapha Delight Presentation"],
  ["assets/images/products/product-01.png","Chilli Sauce Pack"],
  ["assets/images/products/product-02.png","Green Chilli Sauce Pack"],
  ["assets/images/products/product-03.png","Chilli Sauce Sachet"],
  ["assets/images/products/product-04.png","Sorghum Leaves Powder Sachet"],
  ["assets/images/products/product-05.png","Prekese and Ginger Powder"],
  ["assets/images/products/product-06.png","Complete Spice"],
  ["assets/images/products/product-07.png","Cinnamon Powder"],
  ["assets/images/products/product-08.png","Granola Jars"],
  ["assets/images/products/product-09.png","Sorghum Leaves Powder Jars"],
  ["assets/images/products/product-10.png","Waakye Leaves Powder"],
  ["assets/images/products/product-11.png","Sorghum Leaves Powder Tubs"],
  ["assets/images/products/product-12.png","Finger Millet Flour"],
  ["assets/images/products/product-13.png","Cashew Paste Jars"],
  ["assets/images/products/product-14.png","Chilli Sauce Jars"],
  ["assets/images/products/product-15.png","Prekese Powder Sachets"],
  ["assets/images/products/grains-of-paradise-clean.jpg","Grains of Paradise Ground"]
];
var services=[
  ["01","Organic product innovation","We turn raw organic crops into flour, nut butter and functional powders made for modern diets."],
  ["02","Sustainable marketing","Local presence plus global digital reach, from social media and e-commerce to influencer partnerships and ESG branding."],
  ["03","Partnerships and exports","We work wth health food distributors, supermarkets and export partners for retail and wholesale growth."],
  ["04","Community empowerment","Fair trade and sustainable farming support for local farmers, so the whole community benefits."],
  ["05","Private label development","Contract production and private label manufacturing to your exact specification."],
  ["06","Green certification consulting","Certification and consulting for responsible production that ethically minded customers trust."]
];
var flag=[
  ["Finger Millet Flour","Naturally gluten-free flour for health-conscious homes, bakeries and anyone looking for a nourishing grain option.","High in fiber, protein and minerals. Supports digestion and everyday energy.","Porridge, bread, cakes, biscuits and wholesome baking.","assets/images/products/product-12.png","Gluten-free flour"],
  ["Cashew Paste","A smooth, rich cashew spread made for snacking, cooking and premium pantry shelves.","Packed with healthy fats, plant protein and minerals for steady, satisfying nutrition.","Spread on bread, blend into sauces, add to smoothies or use in recipes.","assets/images/products/product-13.png","Stone-ground spread"],
  ["Sorghum Leaves Powder","A vibrant, antioxidant-rich powder made from sorghum leaves for everyday wellness and food use.","Rich in antioxidants, iron, fiber and vitamins. Supports general wellness and functional diets.","Smoothies, herbal tea, natural flavouring, cooking and natural colouring.","assets/images/products/product-09.png","Functional powder"],
  ["Complete Spice","An aromatic all-purpose seasoning crafted to bring depth, warmth and balance to everyday meals.","A convenient spice blend that helps lift flavour without making cooking complicated.","Soups, stews, sauces, marinades, rice dishes and everyday seasoning.","assets/images/products/product-06.png","All-purpose spice"],
  ["Prekese and Ginger Powder","A bold traditional blend of prekese and ginger made for rich flavour, warmth and everyday wellness routines.","Combines the distinctive aroma of prekese with ginger's warming character for a functional pantry staple.","Soups, teas, porridges, stews, marinades and herbal drink blends.","assets/images/products/product-05.png","Herbal spice blend"],
  ["Prekese Powder","Pure prekese powder with a deep traditional aroma, packaged for convenient everyday cooking and wellness use.","A classic Ghanaian ingredient known for its distinctive flavour and valued traditional uses.","Soups, stews, herbal drinks, marinades and traditional recipes.","assets/images/products/product-15.png","Traditional spice"],
  ["Granola","Crunchy oat-based granola packed with nuts, seeds and dried fruit for a quick, satisfying everyday meal.","A convenient source of fiber, healthy fats and slow-release energy for busy mornings.","Breakfast bowls, yoghurt toppings, snacks, smoothies and travel packs.","assets/images/products/product-08.png","Breakfast crunch"],
  ["Cinnamon Powder","Warm, aromatic cinnamon powder packaged for everyday kitchens, bakeries and wellness-conscious homes.","Adds natural sweetness, rich aroma and comforting spice notes to foods and drinks.","Tea, porridge, baking, smoothies, desserts and spice blends.","assets/images/products/product-07.png","Aromatic spice"],
  ["Chilli Sauce Pack","A bold, ready-to-use chilli sauce pack made for customers who want rich heat and convenience.","Adds deep pepper flavour and a spicy kick without extra preparation.","Rice dishes, stews, noodles, grills, marinades and everyday meals.","assets/images/products/product-01.png","Ready sauce pack"],
  ["Grains of Paradise","A finely ground West African spice with a warm, peppery flavour for everyday kitchens and wellness shelves.","Aromatic, naturally sourced and valued for its bold flavour in traditional and modern recipes.","Soups, stews, sauces, marinades, spice blends, teas and everyday seasoning.","assets/images/products/grains-of-paradise-clean.jpg","Ground spice"]
];
var more=[];
document.getElementById('svc').innerHTML=services.map(function(s){return '<article class="service"><span class="sym" aria-hidden="true">'+s[0]+'</span><h3>'+s[1]+'</h3><p>'+s[2]+'</p></article>'}).join('');
document.getElementById('flag').innerHTML=flag.map(function(p){return '<article class="product"><span class="product-badge">'+p[5]+'</span><div class="product-img"><img src="'+p[4]+'" alt="'+p[0]+'" data-preview-title="'+p[0]+'" data-preview-count="'+p[5]+'"></div><div class="product-body"><h3>'+p[0]+'</h3><p>'+p[1]+'</p><dl><div><dt>Benefits: </dt><dd>'+p[2]+'</dd></div><div><dt>Uses: </dt><dd>'+p[3]+'</dd></div></dl><a class="btn sm" href="#contact" data-p="'+p[0]+'">Order this</a></div></article>'}).join('');
document.getElementById('more').innerHTML=more.map(function(p){return '<article class="mini"><h3>'+p[0]+'</h3><p>'+p[1]+'</p><a href="#contact" data-p="'+p[0]+'">Order this</a></article>'}).join('');
var galleryIndex=0;
var galleryImage=document.getElementById('galleryImage');
var galleryTitle=document.getElementById('galleryTitle');
var galleryCount=document.getElementById('galleryCount');
var lightbox=document.getElementById('lightbox');
var lightboxImage=document.getElementById('lightboxImage');
var lightboxTitle=document.getElementById('lightboxTitle');
var lightboxCount=document.getElementById('lightboxCount');
function setGalleryImage(index){
  galleryIndex=(index+productGallery.length)%productGallery.length;
  var item=productGallery[galleryIndex];
  galleryImage.src=item[0];
  galleryImage.alt='Rapha Delight '+item[1];
  galleryImage.classList.toggle('feature-photo',item[0]==='assets/images/brand/rapha-founder-photo.png');
  galleryTitle.textContent=item[1];
  galleryCount.textContent=(galleryIndex+1)+' / '+productGallery.length;
}
document.getElementById('galleryNext').addEventListener('click',function(){setGalleryImage(galleryIndex+1);});
function openLightbox(img,title,count){
  lightboxImage.src=img.src;
  lightboxImage.alt=img.alt;
  lightboxTitle.textContent=title;
  lightboxCount.textContent=count;
  lightbox.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow='';
}
galleryImage.addEventListener('click',function(){openLightbox(galleryImage,galleryTitle.textContent,galleryCount.textContent);});
document.getElementById('flag').addEventListener('click',function(e){
  var img=e.target.closest('.product-img img');
  if(img){openLightbox(img,img.dataset.previewTitle,img.dataset.previewCount);}
});
document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',function(e){if(e.target===lightbox){closeLightbox();}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lightbox.classList.contains('open')){closeLightbox();}});
document.addEventListener('click',function(e){
  var a=e.target.closest('[data-p]');
  if(a){
    document.getElementById('interest').value='Product order';
    document.getElementById('msg').value='Hello, I would like to order: '+a.dataset.p+'.';
  }
});
document.getElementById('menu').addEventListener('click',function(){
  var open=!document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open',open);
  this.setAttribute('aria-expanded',open);
});
document.getElementById('links').addEventListener('click',function(e){
  if(e.target.tagName==='A'){document.body.classList.remove('menu-open');document.getElementById('menu').setAttribute('aria-expanded','false');}
});
document.getElementById('y').textContent=new Date().getFullYear();
var note=document.getElementById('note');
var form=document.getElementById('f');
form.addEventListener('submit',function(e){
  e.preventDefault();
  var d=new FormData(form);
  var text='Thank you for contacting Rapha Delight,\n\n'
    +'Name: '+d.get('name')+'\n'
    +'Contact: '+d.get('contact')+'\n'
    +'Interest: '+d.get('interest')+'\n\n'
    +d.get('message');
  window.open('https://wa.me/233244011699?text='+encodeURIComponent(text),'_blank','noopener');
  note.className='note success';
  note.textContent='WhatsApp has opened with your enquiry ready to send.';
});
