export default {
  getProductsViewed({ products, $getPrice, coefficient, list = 'Category' }) {
    return products.map((p, i) => ({
      name: `${p.name}`,
      id: p.identifier,
      price: Math.round(
        $getPrice(p.price.price.mainPriceProps.price.integer) / coefficient
      ),
      brand: 'IKEA',
      category: this.getCategoryFromBreadcrumbs(p.breadcrumbs),
      list,
      position: i + 1,
    }))
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
