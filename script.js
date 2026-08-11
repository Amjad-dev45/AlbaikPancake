/* =========================================================
   ALBAIK PANCAKE — App logic
   ========================================================= */

const WHATSAPP_NUMBER = "96178755818"; // international format, no + or leading 0
const CART_STORAGE_KEY = "albaikPancakeCart";
const LANG_STORAGE_KEY = "albaikPancakeLang";

/* ---------------------------------------------------------
   1. MENU DATA & TRANSLATIONS
   --------------------------------------------------------- */
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "en";

const translations = {
  en: {
    langBtn: "العربية",
    orderNow: "Order Now",
    whatsappOrder: "Order on WhatsApp",
    location: "Haret Saida, Lebanon",
    ourMenu: "Our Menu",
    addToOrder: "Add to Order",
    add: "ADD",
    added: "ADDED ✓",
    yourOrder: "Your Order",
    total: "Total",
    checkout: "Checkout",
    deliveryDetails: "Delivery Details",
    fullName: "Full Name",
    phone: "Phone Number",
    deliveryLocation: "Delivery Location",
    useLocation: "📍 Use My Current Location",
    or: "or",
    manualAddress: "Enter address manually",
    namePlaceholder: "e.g. Amjad Khaled",
    phonePlaceholder: "e.g. 78 123 456",
    addressPlaceholder: "Enter address manually",
    reviewOrder: "Review Order",
    addToppings: "Add Toppings",
    toppingsHint: "Optional — pick as many as you like",
    confirmTitle: "Check Your Order",
    editOrder: "← Edit Order",
    sendWhatsApp: "Send Order on WhatsApp",
    emptyCart: "🥞<br>Your order is empty.<br>Add something delicious!",
    items: "ITEMS",
    item: "ITEM",
    customer: "Customer",
    locationCaptured: "📍 Location captured successfully!",
    gettingLocation: "Getting your location…",
    locError: "Could not get your location. Please enter your address manually.",
    locDenied: "Location permission denied. Please enter your address manually.",
    gpsShared: "📍 Shared via GPS",
    gpsPlaceholder: "Location shared via GPS ✓",
    addedToast: "Added to your order",
    emptyToast: "Your order is empty",
    sentToast: "Order sent — see you soon!",
    errName: "Please enter your full name.",
    errPhone: "Please enter a valid phone number.",
    errAddress: "Share your location or enter an address.",
    deliveryFeesNote: "PRICE DOESN'T INCLUDE DELIVERY FEES",
    categories: {
      pancakes: "Pancakes",
      crepes: "Crepes",
      waffles: "Waffles",
      drinks: "Drinks",
      toppings: "Toppings"
    },
    itemsNames: {
      "pc-nutella": "Nutella Pancake",
      "pc-white": "White Pancake",
      "pc-kinder": "Kinder Pancake",
      "pc-lotus": "Lotus Pancake",
      "pc-pistachio": "Pistachio Pancake",
      "pc-triple": "Triple Chocolate Pancake",
      "pc-bueno": "Bueno Pancake",
      "cr-nutella": "Nutella Crepe",
      "cr-kinder": "Kinder Crepe",
      "cr-lotus": "Lotus Crepe",
      "cr-pistachio": "Pistachio Crepe",
      "cr-triple": "Triple Chocolate Crepe",
      "cr-hersheys": "Hershey's Crepe",
      "cr-bueno": "Bueno Crepe",
      "cr-dubai": "Dubai Chocolate Crepe",
      "wf-nutella": "Nutella Waffle",
      "wf-white": "White Waffle",
      "wf-kinder": "Kinder Waffle",
      "wf-lotus": "Lotus Waffle",
      "wf-pistachio": "Pistachio Waffle",
      "wf-triple": "Triple Chocolate Waffle",
      "wf-hersheys": "Hershey's Waffle",
      "wf-bueno": "Bueno Waffle",
      "dr-candia": "Candia",
      "dr-water": "Water",
      "tp-strawberry": "Strawberry Topping",
      "tp-banana": "Banana Topping",
      "tp-oreo": "Oreo Topping",
      "tp-kinder": "Kinder Topping",
      "tp-lotus": "Lotus Topping",
      "tp-marshmallow": "Marshmallow Topping",
      "tp-brownie": "Brownie Topping"
    }
  },
  ar: {
    langBtn: "English",
    orderNow: "اطلب الآن",
    whatsappOrder: "اطلب عبر واتساب",
    location: "حارة صيدا، لبنان",
    ourMenu: "قائمة الطعام",
    addToOrder: "إضافة إلى الطلب",
    add: "إضافة",
    added: "تمت الإضافة ✓",
    yourOrder: "سلة الطلبات",
    total: "المجموع",
    checkout: "إتمام الطلب",
    deliveryDetails: "تفاصيل التوصيل",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    deliveryLocation: "عنوان التوصيل",
    useLocation: "📍 استخدام موقعي الحالي",
    or: "أو",
    manualAddress: "أدخل العنوان يدويًا",
    namePlaceholder: "مثال: أمجد خالد",
    phonePlaceholder: "مثال: 78 123 456",
    addressPlaceholder: "أدخل العنوان يدويًا",
    reviewOrder: "مراجعة الطلب",
    addToppings: "إضافة إضافات",
    toppingsHint: "اختياري — اختر ما تحب",
    confirmTitle: "تأكيد الطلب",
    editOrder: "تعديل الطلب ←",
    sendWhatsApp: "إرسال الطلب عبر واتساب",
    emptyCart: "🥞<br>سلة الطلبات فارغة.<br>أضف شيئاً شهياً!",
    items: "عناصر",
    item: "عنصر",
    customer: "الزبون",
    locationCaptured: "📍 تم تحديد موقعك بنجاح!",
    gettingLocation: "جاري تحديد موقعك…",
    locError: "تعذر تحديد الموقع. يرجى كتابة العنوان يدويًا.",
    locDenied: "تم رفض صلاحية الموقع. يرجى كتابة العنوان يدويًا.",
    gpsShared: "📍 تم مشاركته عبر GPS",
    gpsPlaceholder: "تم مشاركة الموقع بنجاح ✓",
    addedToast: "تمت الإضافة إلى الطلب",
    emptyToast: "سلة الطلبات فارغة",
    sentToast: "تم إرسال الطلب — نراك قريباً!",
    errName: "يرجى إدخال الاسم الكامل.",
    errPhone: "يرجى إدخال رقم هاتف صحيح.",
    errAddress: "يرجى مشاركة موقعك أو كتابة العنوان.",
    deliveryFeesNote: "السعر لا يشمل رسوم التوصيل",
    categories: {
      pancakes: "بان كيك",
      crepes: "كريب",
      waffles: "وافل",
      drinks: "مشروبات",
      toppings: "إضافات"
    },
    itemsNames: {
      "pc-nutella": "بان كيك نوتيلا",
      "pc-white": "بان كيك شوكولاتة بيضاء",
      "pc-kinder": "بان كيك كيندر",
      "pc-lotus": "بان كيك لوتس",
      "pc-pistachio": "بان كيك فستق حلبي",
      "pc-triple": "بان كيك تريبل شوكليت",
      "pc-bueno": "بان كيك بوينو",
      "cr-nutella": "كريب نوتيلا",
      "cr-kinder": "كريب كيندر",
      "cr-lotus": "كريب لوتس",
      "cr-pistachio": "كريب فستق حلبي",
      "cr-triple": "كريب تريبل شوكليت",
      "cr-hersheys": "كريب هيرشيز",
      "cr-bueno": "كريب بوينو",
      "cr-dubai": "كريب شوكولاتة دبي",
      "wf-nutella": "وافل نوتيلا",
      "wf-white": "وافل شوكولاتة بيضاء",
      "wf-kinder": "وافل كيندر",
      "wf-lotus": "وافل لوتس",
      "wf-pistachio": "وافل فستق حلبي",
      "wf-triple": "وافل تريبل شوكليت",
      "wf-hersheys": "وافل هيرشيز",
      "wf-bueno": "وافل بوينو",
      "dr-candia": "كانديا",
      "dr-water": "مياه معدنية",
      "tp-strawberry": "إضافة فراولة",
      "tp-banana": "إضافة موز",
      "tp-oreo": "إضافة اوريو",
      "tp-kinder": "إضافة كيندر",
      "tp-lotus": "إضافة لوتس",
      "tp-marshmallow": "إضافة مارشملو",
      "tp-brownie": "إضافة براوني"
    }
  }
};

const menu = {
  pancakes: {
    label: "Pancakes",
    icon: "🥞",
    items: [
      { id: "pc-nutella", name: "Nutella Pancake", price: 200000 },
      { id: "pc-white", name: "White Pancake", price: 200000 },
      { id: "pc-kinder", name: "Kinder Pancake", price: 200000 },
      { id: "pc-lotus", name: "Lotus Pancake", price: 200000 },
      { id: "pc-pistachio", name: "Pistachio Pancake", price: 200000 },
      { id: "pc-triple", name: "Triple Chocolate Pancake", price: 200000 },
      { id: "pc-bueno", name: "Bueno Pancake", price: 200000 }
    ]
  },
  crepes: {
    label: "Crepes",
    icon: "🫓",
    items: [
      { id: "cr-nutella", name: "Nutella Crepe", price: 300000 },
      { id: "cr-kinder", name: "Kinder Crepe", price: 300000 },
      { id: "cr-lotus", name: "Lotus Crepe", price: 300000 },
      { id: "cr-pistachio", name: "Pistachio Crepe", price: 350000 },
      { id: "cr-triple", name: "Triple Chocolate Crepe", price: 300000 },
      { id: "cr-hersheys", name: "Hershey's Crepe", price: 300000 },
      { id: "cr-bueno", name: "Bueno Crepe", price: 300000 },
      { id: "cr-dubai", name: "Dubai Chocolate Crepe", price: 450000 }
    ]
  },
  waffles: {
    label: "Waffles",
    icon: "🧇",
    items: [
      { id: "wf-nutella", name: "Nutella Waffle", price: 300000 },
      { id: "wf-white", name: "White Waffle", price: 300000 },
      { id: "wf-kinder", name: "Kinder Waffle", price: 300000 },
      { id: "wf-lotus", name: "Lotus Waffle", price: 300000 },
      { id: "wf-pistachio", name: "Pistachio Waffle", price: 350000 },
      { id: "wf-triple", name: "Triple Chocolate Waffle", price: 300000 },
      { id: "wf-hersheys", name: "Hershey's Waffle", price: 300000 },
      { id: "wf-bueno", name: "Bueno Waffle", price: 300000 }
    ]
  },
  drinks: {
    label: "Drinks",
    icon: "🥤",
    items: [
      { id: "dr-candia", name: "Candia", price: 50000 },
      { id: "dr-water", name: "Water", price: 40000 }
    ]
  },
  toppings: {
    label: "Toppings",
    icon: "🍓",
    items: [
      { id: "tp-strawberry", name: "Strawberry Topping", price: 50000 },
      { id: "tp-banana", name: "Banana Topping", price: 50000 },
      { id: "tp-oreo", name: "Oreo Topping", price: 50000 },
      { id: "tp-kinder", name: "Kinder Topping", price: 50000 },
      { id: "tp-lotus", name: "Lotus Topping", price: 50000 },
      { id: "tp-marshmallow", name: "Marshmallow Topping", price: 50000 },
      { id: "tp-brownie", name: "Brownie Topping", price: 50000 }
    ]
  }
};

/* ---------------------------------------------------------
   2. STATE
   --------------------------------------------------------- */
const TOPPABLE_CATEGORIES = ["pancakes", "crepes", "waffles"];
let cart = {}; 
let deliveryLocationLink = ""; 

/* ---------------------------------------------------------
   3. DOM REFS
   --------------------------------------------------------- */
const categoryNav = document.getElementById("categoryNav");
const productGrid = document.getElementById("productGrid");

const headerCartBtn = document.getElementById("headerCartBtn");
const headerCartCount = document.getElementById("headerCartCount");
const langToggleBtn = document.getElementById("langToggleBtn");
const langBtnText = document.getElementById("langBtnText");

const stickyCartBar = document.getElementById("stickyCartBar");
const stickyCartItems = document.getElementById("stickyCartItems");
const stickyCartTotal = document.getElementById("stickyCartTotal");

const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalPriceEl = document.getElementById("cartTotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutOverlay = document.getElementById("checkoutOverlay");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const checkoutBackBtn = document.getElementById("checkoutBackBtn");
const checkoutForm = document.getElementById("checkoutForm");
const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");
const customerAddressInput = document.getElementById("customerAddress");
const useLocationBtn = document.getElementById("useLocationBtn");
const locationStatus = document.getElementById("locationStatus");

const confirmOverlay = document.getElementById("confirmOverlay");
const confirmModal = document.getElementById("confirmModal");
const closeConfirmBtn = document.getElementById("closeConfirmBtn");
const confirmBackBtn = document.getElementById("confirmBackBtn");
const confirmBody = document.getElementById("confirmBody");
const editOrderBtn = document.getElementById("editOrderBtn");
const sendWhatsAppBtn = document.getElementById("sendWhatsAppBtn");

const toppingsOverlay = document.getElementById("toppingsOverlay");
const toppingsModal = document.getElementById("toppingsModal");
const closeToppingsBtn = document.getElementById("closeToppingsBtn");
const toppingsItemName = document.getElementById("toppingsItemName");
const toppingsList = document.getElementById("toppingsList");
const toppingsTotalEl = document.getElementById("toppingsTotal");
const toppingsQtyValue = document.getElementById("toppingsQtyValue");
const toppingsQtyDec = document.getElementById("toppingsQtyDec");
const toppingsQtyInc = document.getElementById("toppingsQtyInc");
const toppingsAddBtn = document.getElementById("toppingsAddBtn");

const orderNowBtn = document.getElementById("orderNowBtn");
const toastEl = document.getElementById("toast");

/* ---------------------------------------------------------
   4. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  cart = loadCart();
  setLanguage(currentLang);
  bindEvents();
});

/* ---------------------------------------------------------
   5. LANGUAGE SWITCHER
   --------------------------------------------------------- */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  langBtnText.textContent = translations[lang].langBtn;

  // Translate DOM elements with data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update Placeholders
  customerNameInput.placeholder = translations[lang].namePlaceholder;
  customerPhoneInput.placeholder = translations[lang].phonePlaceholder;
  if (!deliveryLocationLink) {
    customerAddressInput.placeholder = translations[lang].addressPlaceholder;
  }

  // Update menu data
  Object.keys(menu).forEach(catKey => {
    menu[catKey].label = translations[lang].categories[catKey] || menu[catKey].label;
    menu[catKey].items.forEach(item => {
      item.displayName = translations[lang].itemsNames[item.id] || item.name;
    });
  });

  renderCategoryNav();
  renderMenu();
  updateCartUI();
  highlightActiveCategory();
  if (cartDrawer.classList.contains("open")) renderCartItems();
  if (toppingsModal.classList.contains("open")) refreshOpenToppings();
  if (confirmModal.classList.contains("open")) renderConfirmBody();
}

function toggleLanguage() {
  const newLang = currentLang === "en" ? "ar" : "en";
  setLanguage(newLang);
}

function getItemName(item) {
  return item.displayName || item.name;
}

/* ---------------------------------------------------------
   6. RENDER MENU
   --------------------------------------------------------- */
function renderCategoryNav(){
  categoryNav.innerHTML = "";
  Object.keys(menu).forEach((catKey, index) => {
    const pill = document.createElement("button");
    pill.className = "category-pill" + (index === 0 ? " active" : "");
    pill.textContent = menu[catKey].label;
    pill.dataset.category = catKey;
    pill.addEventListener("click", () => {
      setActivePill(catKey);
      const target = document.getElementById(`cat-${catKey}`);
      if (target) {
        const offset = 130;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
        suppressSpyUntil = Date.now() + 800;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
    categoryNav.appendChild(pill);
  });
}

function renderMenu(){
  productGrid.innerHTML = "";

  Object.keys(menu).forEach(catKey => {
    const category = menu[catKey];

    const heading = document.createElement("h3");
    heading.className = "category-heading";
    heading.id = `cat-${catKey}`;
    heading.textContent = `${category.icon} ${category.label}`;
    productGrid.appendChild(heading);

    category.items.forEach(item => {
      productGrid.appendChild(renderProductCard(item, category.icon, catKey));
    });
  });
}

function renderProductCard(item, icon, catKey){
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.itemId = item.id;

  const itemName = getItemName(item);

  card.innerHTML = `
    <div class="product-visual">
      <img src="images/${item.id}.jpg" alt="${escapeHtml(itemName)}" width="512" height="512" loading="lazy">
    </div>
    <div class="product-info">
      <div class="product-name">${escapeHtml(itemName)}</div>
      <div class="product-price">${formatPrice(item.price)}</div>
    </div>
    <div class="product-actions">
      <div class="qty-control">
        <button class="qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>
        <span class="qty-value">1</span>
        <button class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
      </div>
      <button class="add-btn" data-action="add">${translations[currentLang].add}</button>
    </div>
  `;

  const qtyValueEl = card.querySelector(".qty-value");
  const addBtn = card.querySelector(".add-btn");

  card.querySelector('[data-action="decrease"]').addEventListener("click", () => {
    const current = parseInt(qtyValueEl.textContent, 10);
    if (current > 1) qtyValueEl.textContent = current - 1;
  });

  card.querySelector('[data-action="increase"]').addEventListener("click", () => {
    const current = parseInt(qtyValueEl.textContent, 10);
    qtyValueEl.textContent = current + 1;
  });

  addBtn.addEventListener("click", () => {
    const amount = parseInt(qtyValueEl.textContent, 10);
    qtyValueEl.textContent = "1";

    if (TOPPABLE_CATEGORIES.includes(catKey)) {
      openToppings(item, amount);
      return;
    }

    addToCart(item.id, [], amount);
    addBtn.textContent = translations[currentLang].added;
    addBtn.classList.add("added");
    setTimeout(() => {
      addBtn.textContent = translations[currentLang].add;
      addBtn.classList.remove("added");
    }, 900);
  });

  return card;
}

/* ---------------------------------------------------------
   7. CART LOGIC
   --------------------------------------------------------- */
function findItemById(itemId){
  for (const catKey of Object.keys(menu)) {
    const found = menu[catKey].items.find(i => i.id === itemId);
    if (found) return found;
  }
  return null;
}

function makeLineKey(itemId, toppings){
  const list = [...toppings].sort();
  return list.length ? `${itemId}::${list.join(",")}` : itemId;
}

function linePrices(line){
  const item = findItemById(line.itemId);
  if (!item) return null;
  const toppingItems = line.toppings.map(findItemById).filter(Boolean);
  const unit = item.price + toppingItems.reduce((sum, t) => sum + t.price, 0);
  return { item, toppingItems, unit, total: unit * line.qty };
}

function addToCart(itemId, toppings = [], amount = 1){
  const key = makeLineKey(itemId, toppings);
  if (cart[key]) {
    cart[key].qty += amount;
  } else {
    cart[key] = { itemId, toppings: [...toppings].sort(), qty: amount };
  }
  saveCart();
  updateCartUI();
  if (cartDrawer.classList.contains("open")) renderCartItems();
  showToast(translations[currentLang].addedToast);
}

function removeFromCart(lineKey){
  delete cart[lineKey];
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQuantity(lineKey, newQty){
  if (newQty <= 0) {
    removeFromCart(lineKey);
    return;
  }
  if (!cart[lineKey]) return;
  cart[lineKey].qty = newQty;
  saveCart();
  updateCartUI();
  renderCartItems();
}

function calculateTotal(){
  let total = 0;
  let count = 0;
  Object.values(cart).forEach(line => {
    const prices = linePrices(line);
    if (prices) {
      total += prices.total;
      count += line.qty;
    }
  });
  return { total, count };
}

function saveCart(){
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
}

function loadCart(){
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const clean = {};
    Object.entries(parsed).forEach(([key, value]) => {
      const line = typeof value === "number"
        ? { itemId: key, toppings: [], qty: Math.floor(value) }
        : value;
      if (!line || typeof line !== "object") return;
      const qty = Math.floor(Number(line.qty));
      if (!findItemById(line.itemId) || !(qty > 0)) return;
      const toppings = Array.isArray(line.toppings)
        ? line.toppings.filter(id => findItemById(id))
        : [];
      const cleanKey = makeLineKey(line.itemId, toppings);
      clean[cleanKey] = { itemId: line.itemId, toppings: [...toppings].sort(), qty };
    });
    return clean;
  } catch (e) {
    return {};
  }
}

/* ---------------------------------------------------------
   8. TOPPINGS PICKER
   --------------------------------------------------------- */
let toppingsDraft = { item: null, qty: 1, selected: [] };

function openToppings(item, qty){
  toppingsDraft = { item, qty: qty > 0 ? qty : 1, selected: [] };
  toppingsItemName.textContent = getItemName(item);
  toppingsQtyValue.textContent = String(toppingsDraft.qty);

  toppingsList.innerHTML = "";
  menu.toppings.items.forEach(topping => {
    const label = document.createElement("label");
    label.className = "topping-option";
    label.innerHTML = `
      <input type="checkbox" value="${topping.id}">
      <img class="topping-thumb" src="images/${topping.id}.jpg" alt="" width="512" height="512" loading="lazy">
      <span class="topping-option-name">${escapeHtml(getItemName(topping))}</span>
      <span class="topping-option-price">+${formatPrice(topping.price)}</span>
    `;
    const input = label.querySelector("input");
    input.addEventListener("change", () => {
      label.classList.toggle("selected", input.checked);
      if (input.checked) toppingsDraft.selected.push(topping.id);
      else toppingsDraft.selected = toppingsDraft.selected.filter(id => id !== topping.id);
      updateToppingsTotal();
    });
    toppingsList.appendChild(label);
  });

  updateToppingsTotal();
  toppingsOverlay.classList.add("visible");
  toppingsModal.classList.add("open");
  lockScroll();
}

function closeToppings(){
  toppingsOverlay.classList.remove("visible");
  toppingsModal.classList.remove("open");
  syncScrollLock();
}

function refreshOpenToppings(){
  if (!toppingsDraft.item) return;
  toppingsItemName.textContent = getItemName(toppingsDraft.item);
  const labels = toppingsList.querySelectorAll(".topping-option");
  menu.toppings.items.forEach((topping, idx) => {
    const label = labels[idx];
    if (!label) return;
    label.querySelector(".topping-option-name").textContent = getItemName(topping);
    label.querySelector(".topping-option-price").textContent = `+${formatPrice(topping.price)}`;
  });
  updateToppingsTotal();
}

function updateToppingsTotal(){
  if (!toppingsDraft.item) return;
  const prices = linePrices({
    itemId: toppingsDraft.item.id,
    toppings: toppingsDraft.selected,
    qty: toppingsDraft.qty
  });
  toppingsTotalEl.textContent = formatPrice(prices ? prices.total : 0);
}

/* ---------------------------------------------------------
   9. CART UI
   --------------------------------------------------------- */
function updateCartUI(){
  const { total, count } = calculateTotal();

  headerCartCount.textContent = count;
  headerCartCount.classList.toggle("empty", count === 0);
  headerCartCount.classList.remove("bump");
  void headerCartCount.offsetWidth;
  if (count > 0) headerCartCount.classList.add("bump");

  cartTotalPriceEl.textContent = formatPrice(total);

  if (count > 0) {
    stickyCartBar.hidden = false;
    const label = count > 1 ? translations[currentLang].items : translations[currentLang].item;
    stickyCartItems.textContent = `${count} ${label}`;
    stickyCartTotal.textContent = formatPrice(total);
  } else {
    stickyCartBar.hidden = true;
  }
}

function renderCartItems(){
  cartItemsEl.innerHTML = "";
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">${translations[currentLang].emptyCart}</div>`;
    return;
  }

  entries.forEach(([lineKey, line]) => {
    const prices = linePrices(line);
    if (!prices) return;
    const { item, toppingItems, unit, total } = prices;
    const qty = line.qty;

    const el = document.createElement("div");
    el.className = "cart-line";
    el.innerHTML = `
      <div class="cart-line-info">
        <div class="cart-line-name">${escapeHtml(getItemName(item))}</div>
        ${toppingItems.length ? `<div class="cart-line-toppings">+ ${toppingItems.map(t => escapeHtml(getItemName(t))).join(", ")}</div>` : ""}
        <div class="cart-line-price">${formatPrice(unit)} × ${qty} = ${formatPrice(total)}</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" data-action="dec">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn" data-action="inc">+</button>
      </div>
      <button class="cart-line-remove" aria-label="Remove ${escapeHtml(getItemName(item))}">🗑</button>
    `;

    el.querySelector('[data-action="dec"]').addEventListener("click", () => updateQuantity(lineKey, qty - 1));
    el.querySelector('[data-action="inc"]').addEventListener("click", () => updateQuantity(lineKey, qty + 1));
    el.querySelector(".cart-line-remove").addEventListener("click", () => removeFromCart(lineKey));

    cartItemsEl.appendChild(el);
  });
}

function lockScroll(){
  document.body.classList.add("no-scroll");
}

function syncScrollLock(){
  const anyOpen =
    toppingsModal.classList.contains("open") ||
    cartDrawer.classList.contains("open") ||
    checkoutModal.classList.contains("open") ||
    confirmModal.classList.contains("open");
  document.body.classList.toggle("no-scroll", anyOpen);
}

function openCart(){
  renderCartItems();
  cartOverlay.classList.add("visible");
  cartDrawer.classList.add("open");
  lockScroll();
}

function closeCart(){
  cartOverlay.classList.remove("visible");
  cartDrawer.classList.remove("open");
  syncScrollLock();
}

/* ---------------------------------------------------------
   10. CHECKOUT & GEOLOCATION
   --------------------------------------------------------- */
function openCheckout(){
  if (calculateTotal().count === 0) {
    closeCart();
    showToast(translations[currentLang].emptyToast);
    return;
  }
  closeCart();
  checkoutOverlay.classList.add("visible");
  checkoutModal.classList.add("open");
  lockScroll();
  setTimeout(() => customerNameInput.focus(), 220);
}

function closeCheckout(){
  checkoutOverlay.classList.remove("visible");
  checkoutModal.classList.remove("open");
  syncScrollLock();
}

function clearFieldErrors(){
  document.getElementById("nameError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("addressError").textContent = "";
  customerNameInput.classList.remove("invalid");
  customerPhoneInput.classList.remove("invalid");
  customerAddressInput.classList.remove("invalid");
}

function validateCheckout(){
  let valid = true;

  const name = customerNameInput.value.trim();
  const phone = customerPhoneInput.value.trim();
  const address = customerAddressInput.value.trim();

  clearFieldErrors();

  if (!name) {
    document.getElementById("nameError").textContent = translations[currentLang].errName;
    customerNameInput.classList.add("invalid");
    valid = false;
  }

  if (!phone || phone.replace(/\D/g, "").length < 7) {
    document.getElementById("phoneError").textContent = translations[currentLang].errPhone;
    customerPhoneInput.classList.add("invalid");
    valid = false;
  }

  if (!deliveryLocationLink && !address) {
    document.getElementById("addressError").textContent = translations[currentLang].errAddress;
    customerAddressInput.classList.add("invalid");
    valid = false;
  }

  return valid;
}

function getLocation(){
  if (!navigator.geolocation) {
    setLocationStatus(translations[currentLang].locError, "error");
    return;
  }

  setLocationStatus(translations[currentLang].gettingLocation, "");
  useLocationBtn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      deliveryLocationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      customerAddressInput.value = "";
      customerAddressInput.placeholder = translations[currentLang].gpsPlaceholder;
      setLocationStatus(translations[currentLang].locationCaptured, "success");
      useLocationBtn.disabled = false;
    },
    error => {
      deliveryLocationLink = "";
      let message = translations[currentLang].locError;
      if (error.code === error.PERMISSION_DENIED) {
        message = translations[currentLang].locDenied;
      }
      setLocationStatus(message, "error");
      useLocationBtn.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function setLocationStatus(message, type){
  locationStatus.textContent = message;
  locationStatus.className = "location-status" + (type ? ` ${type}` : "");
}

/* ---------------------------------------------------------
   11. ORDER CONFIRMATION & WHATSAPP
   --------------------------------------------------------- */
function openConfirm(){
  renderConfirmBody();
  closeCheckoutOnly();
  confirmOverlay.classList.add("visible");
  confirmModal.classList.add("open");
  lockScroll();
}

function closeCheckoutOnly(){
  checkoutOverlay.classList.remove("visible");
  checkoutModal.classList.remove("open");
  syncScrollLock();
}

function closeConfirm(){
  confirmOverlay.classList.remove("visible");
  confirmModal.classList.remove("open");
  syncScrollLock();
}

function renderConfirmBody(){
  const name = customerNameInput.value.trim();
  const phone = customerPhoneInput.value.trim();
  const address = customerAddressInput.value.trim();
  const locationText = deliveryLocationLink ? translations[currentLang].gpsShared : address;

  const { total } = calculateTotal();

  let linesHtml = "";
  Object.values(cart).forEach(line => {
    const prices = linePrices(line);
    if (!prices) return;
    const extras = prices.toppingItems.map(t => getItemName(t)).join(", ");
    linesHtml += `
      <div class="confirm-order-line">
        <span>${line.qty} × ${escapeHtml(getItemName(prices.item))}${extras ? ` <em>(+ ${escapeHtml(extras)})</em>` : ""}</span>
        <span>${formatPrice(prices.total)}</span>
      </div>
    `;
  });

  confirmBody.innerHTML = `
    <div class="confirm-group">
      <div class="confirm-label">${translations[currentLang].customer}</div>
      <div class="confirm-value">${escapeHtml(name)}</div>
    </div>
    <div class="confirm-group">
      <div class="confirm-label">${translations[currentLang].phone}</div>
      <div class="confirm-value">${escapeHtml(phone)}</div>
    </div>
    <div class="confirm-group">
      <div class="confirm-label">${translations[currentLang].deliveryLocation}</div>
      <div class="confirm-value">${escapeHtml(locationText)}</div>
    </div>
    <div class="confirm-group">
      <div class="confirm-label">${translations[currentLang].yourOrder}</div>
      ${linesHtml}
      <div class="confirm-total">
        <span>${translations[currentLang].total}</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="delivery-note">
        ${translations[currentLang].deliveryFeesNote}
      </div>
    </div>
  `;
}

function generateWhatsAppMessage(){
  const name = customerNameInput.value.trim();
  const phone = customerPhoneInput.value.trim();
  const address = customerAddressInput.value.trim();
  const locationLine = deliveryLocationLink || address;
  const { total } = calculateTotal();

  let orderLines = "";
  Object.values(cart).forEach(line => {
    const prices = linePrices(line);
    if (!prices) return;
    const extras = prices.toppingItems.map(t => getItemName(t)).join(", ");
    orderLines += `${line.qty} × ${getItemName(prices.item)}\n`;
    if (extras) orderLines += `   + ${extras}\n`;
    orderLines += `${formatPrice(prices.total)}\n\n`;
  });

  const message =
` ALBAIK PANCAKE - NEW ORDER

 CUSTOMER
Name: ${name}

 PHONE
${phone}

 LOCATION
${locationLine}

🛒 ORDER

${orderLines.trim()}

----------------------------

 TOTAL: ${formatPrice(total)}

 FINAL PRICE DOESN'T INCLUDE DELIVERY FEES

Thank you!`;

  return message;
}

function sendWhatsAppOrder(){
  const message = generateWhatsAppMessage();
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  const win = window.open(url, "_blank", "noopener");
  if (!win) window.location.href = url;

  cart = {};
  saveCart();
  updateCartUI();
  renderMenu();
  closeConfirm();
  checkoutForm.reset();
  deliveryLocationLink = "";
  customerAddressInput.placeholder = translations[currentLang].addressPlaceholder;
  clearFieldErrors();
  setLocationStatus("", "");
  showToast(translations[currentLang].sentToast);
}

/* ---------------------------------------------------------
   12. HELPERS & EVENT BINDINGS
   --------------------------------------------------------- */
function formatPrice(amount){
  return `${amount.toLocaleString("en-US")} LBP`;
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

let toastTimeout;
function showToast(message){
  clearTimeout(toastTimeout);
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  toastTimeout = setTimeout(() => toastEl.classList.remove("visible"), 1800);
}

function bindEvents(){
  langToggleBtn.addEventListener("click", toggleLanguage);

  orderNowBtn.addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });

  closeToppingsBtn.addEventListener("click", closeToppings);
  toppingsOverlay.addEventListener("click", closeToppings);
  toppingsQtyDec.addEventListener("click", () => {
    if (toppingsDraft.qty > 1) {
      toppingsDraft.qty -= 1;
      toppingsQtyValue.textContent = String(toppingsDraft.qty);
      updateToppingsTotal();
    }
  });
  toppingsQtyInc.addEventListener("click", () => {
    toppingsDraft.qty += 1;
    toppingsQtyValue.textContent = String(toppingsDraft.qty);
    updateToppingsTotal();
  });
  toppingsAddBtn.addEventListener("click", () => {
    if (!toppingsDraft.item) return;
    addToCart(toppingsDraft.item.id, toppingsDraft.selected, toppingsDraft.qty);
    closeToppings();
  });

  headerCartBtn.addEventListener("click", openCart);
  stickyCartBar.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  checkoutBtn.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) {
      showToast(translations[currentLang].emptyToast);
      return;
    }
    openCheckout();
  });

  closeCheckoutBtn.addEventListener("click", closeCheckoutOnly);
  checkoutBackBtn.addEventListener("click", () => {
    closeCheckoutOnly();
    openCart();
  });
  checkoutOverlay.addEventListener("click", closeCheckoutOnly);

  useLocationBtn.addEventListener("click", getLocation);

  customerAddressInput.addEventListener("input", () => {
    if (customerAddressInput.value.trim()) {
      deliveryLocationLink = "";
      customerAddressInput.placeholder = translations[currentLang].addressPlaceholder;
    }
  });

  checkoutForm.addEventListener("submit", e => {
    e.preventDefault();
    if (validateCheckout()) {
      openConfirm();
    }
  });

  closeConfirmBtn.addEventListener("click", closeConfirm);
  confirmOverlay.addEventListener("click", closeConfirm);
  confirmBackBtn.addEventListener("click", () => {
    closeConfirm();
    openCheckout();
  });
  editOrderBtn.addEventListener("click", () => {
    closeConfirm();
    openCheckout();
  });

  sendWhatsAppBtn.addEventListener("click", sendWhatsAppOrder);

  window.addEventListener("scroll", highlightActiveCategory, { passive: true });

  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (toppingsModal.classList.contains("open")) closeToppings();
    else if (confirmModal.classList.contains("open")) closeConfirm();
    else if (checkoutModal.classList.contains("open")) closeCheckoutOnly();
    else if (cartDrawer.classList.contains("open")) closeCart();
  });
}

function setActivePill(catKey){
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.category === catKey);
  });
}

let suppressSpyUntil = 0;

function highlightActiveCategory(){
  if (Date.now() < suppressSpyUntil) return;

  const catKeys = Object.keys(menu);
  let currentCat = catKeys[0];

  catKeys.forEach(catKey => {
    const heading = document.getElementById(`cat-${catKey}`);
    if (!heading) return;
    if (heading.getBoundingClientRect().top <= 160) currentCat = catKey;
  });

  setActivePill(currentCat);
}

