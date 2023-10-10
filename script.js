async function fetchData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Не удалось получить сведения из data.json");
    }
    const data = await response.json();
    const cardDiv = document.querySelector(".products__grid");
    data.forEach(({ imgUrl, cardTitle, cardSubtitle, prise, id }) => {
      const productCard = `
        <div id="${id}" href="#" class="product-card">
            <div class="product-card__img">
                <img class="product-card__image" src="${imgUrl}" alt="products">
                <div class="product-card__btn">
                    <img class="product-card__icon" src="img/Forma1copy.svg" alt="icon">Add to Cart
                </div>
            </div>
            <h3 class="product-card__title">${cardTitle}</h3>
            <p class="product-card__text">${cardSubtitle}</p>
            <span class="product-card__subtext">$${prise}</span>
        </div>`;
      cardDiv.insertAdjacentHTML("beforeend", productCard);
    });
  } catch (error) {
    console.log(error);
  }
}
fetchData();




fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const cartBtn = document.querySelectorAll(".product-card__btn");
    cartBtn.forEach((element) => {
      element.addEventListener("click", (e) => {
        const cartElem = document.querySelector(".cart-items");
        const cartChaild = cartElem.children;
        data.forEach(({ imgUrl, cardTitle, prise, size, color, id }) => {
          const idData = id;
          const productCard = `
                        <article class="cart-card">
                        <img class="cart-card__img" src="${imgUrl}" alt="product">
                        <div class="cart-card__content">
                            <h3 class="cart-card__title">${cardTitle}<nobr>T-SHIRT</nobr></h3>
                            <div class="cart-card__details">
                                <p class="cart-card__detail">Price: <span class="cart-card__detail-price">$${prise}</span></p>
                                <p class="cart-card__detail">Color: <span class="cart-card__detail-color">${color}</span></p>
                                <p class="cart-card__detail">Size: <span class="cart-card__detail-size">${size}</span></p>
                                <p class="cart-card__detail">Quantity: <input type="number" class="cart-card__detail-input"></p>
                            </div>
                        </div>
                        <button class="cart-card__close">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                                </svg>
                        </button>
                    </article>`;
          if (cartChaild.length === 0) {
            const title = document.createElement("h2");
            title.classList.add("cart-items__title");
            title.textContent = "Cart Items";
            cartElem.appendChild(title);
          }
          if (e.target.closest(".product-card").id === idData) {
            cartElem.insertAdjacentHTML("beforeend", productCard);
          }
        });
        const closeBtn = document.querySelectorAll(".cart-card__close");
        closeBtn.forEach((element) => {
          element.addEventListener("click", (e) => {
            e.target.closest(".cart-card").remove();
            if (cartChaild.length === 1) {
              const cartItemsTitle =
                document.querySelector(".cart-items__title");
              cartItemsTitle.remove();
            }
          });
        });
      });
    });
  });
