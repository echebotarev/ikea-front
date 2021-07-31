export default {
  clickProduct({ products, $getPrice, coefficient, list = 'Category' }) {
    return {
      ecommerce: {
        currencyCode: 'RUB',
        click: {
          actionField: { list },
          products: this.getProductsViewed({
            products,
            $getPrice,
            coefficient,
            list: null,
          }),
        },
      },
      event: 'gtm-ee-event',
      'gtm-ee-event-category': 'Enhanced Ecommerce',
      'gtm-ee-event-action': 'Product Clicks',
      'gtm-ee-event-non-interaction': false,
    }
  },

  getProductsViewed({ products, $getPrice, coefficient, list = 'Category' }) {
    return products.map((p, i) =>
      Object.assign(
        {
          name: `${p.name}`,
          id: p.identifier,
          price: Math.round(
            $getPrice(p.price.price.mainPriceProps.price.integer) / coefficient
          ),
          brand: 'IKEA',
          category: this.getCategoryFromBreadcrumbs(p.breadcrumbs),
          position: p.position ? p.position : i + 1,
        },
        // если передать в list === null, то получится массив для clickProduct
        list ? { list } : {}
      )
    )
  },

  getProductsForCheckout({ products, $getPrice, coefficient }) {
    return products.map((p, i) =>
      Object.assign({
        name: `${p.name}`,
        id: p.identifier,
        price: Math.round(
          $getPrice(p.price.price.mainPriceProps.price.integer) / coefficient
        ),
        brand: 'IKEA',
        category: this.getCategoryFromBreadcrumbs(p.breadcrumbs),
        quantity: p.qnt,
      })
    )
  },

  getCategoryFromBreadcrumbs(breadcrumbs) {
    return breadcrumbs.itemListElement.reduce((acc = '', item, index, arr) => {
      if (index === 0) {
        return acc
      }

      if (index === 1) {
        return item.name
      }

      if (index === arr.length - 1) {
        return acc
      }

      return `${acc}/${item.name}`
    })
  },
}
