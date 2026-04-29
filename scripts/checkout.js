renderCart()

function renderCart() {
  
    let cartHTML = '';
    cart.forEach(function(value, index) {
      
      let deliveryOptionsHTML = '';
      const productId = value.productId
      let matchingProduct;
      products.forEach(function(product) {

        if (product.id === productId) {
          matchingProduct = product
        }

      });
      console.log(matchingProduct);
      
      deliveryOptions.forEach(function(exact_date) {
        const days = dayjs()
        const date = days.add(exact_date.date, 'days')
        const dateFormat = date.format('dddd, MMMM D')

        let priceText;
        if (exact_date.priceCents === 0) {
          priceText = 'Free Shipping';
        }
        else{
          priceText = `${exact_date.priceCents / 100} shipping`
        };

        let check;

          if (String(value.deliveryOptionId) === String(exact_date.id)) {
            check = 'checked';
          }
          else{
            check = '';
          }
        deliveryOptionsHTML = deliveryOptionsHTML + `
                    <div class="delivery-option">
                      <input type="radio" ${check}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateFormat}
                        </div>
                        <div class="delivery-option-price">
                          ${priceText}
                        </div>
                      </div>
                    </div>`
        
      });

      let matchingDate;
          deliveryOptions.forEach(function(exact_date) {
            if(value.deliveryOptionId === exact_date.id) {
              matchingDate = exact_date
            }

          });
          const exactday = dayjs()
          const exactdate = exactday.add(matchingDate.date , 'days')
          const exactformat = exactdate.format('dddd, MMMM D')




        cartHTML = cartHTML + `<div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: ${exactformat}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                      $${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${value.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link" data-index = "${index}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML}
                  </div>
                </div>
              </div>`
    });
    console.log(cartHTML);
    document.querySelector('.js-order-summary').innerHTML = cartHTML;
    

    const deleteElement = document.querySelectorAll('.js-delete-link')

    deleteElement.forEach(function(remove) {
      
      remove.addEventListener('click', function() {
        const deleteItem = remove.dataset.index
        cart.splice(deleteItem, 1)
        localStorage.setItem('cart', JSON.stringify(cart))
        renderCart();
        
      });
    });
    
}


