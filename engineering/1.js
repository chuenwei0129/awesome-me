if (module.hot) {
  // accept update of dependency
  module.hot.accept(['./title.js'], () => {
    console.log(`🔁  HMR Reloading: ${module.id}`)
  })
}
