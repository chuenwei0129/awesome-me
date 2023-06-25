let i_initial = 0,
  getI_initial = () => i_initial

{
  let i_iteration0 = i_initial

  // TEST: i_iteration0 < 3 --> TRUE

  let getI_iteration0 = getI_initial
  console.log(getI_iteration0())

  {
    let i_iteration1 = i_iteration0
    let getI_iteration1 = getI_iteration0

    i_iteration1++

    // TEST: i_iteration1 < 3 --> TRUE

    console.log(getI_iteration1())

    {
      let i_iteration2 = i_iteration1
      let getI_iteration2 = getI_iteration1

      i_iteration2++

      // TEST: i_iteration2 < 3 --> TRUE

      console.log(getI_iteration2())

      {
        let i_iteration3 = i_iteration2
        let getI_iteration3 = getI_iteration2

        i_iteration3++

        // TEST: i_iteration3 < 3 --> FALSE
      }
    }
  }
}
