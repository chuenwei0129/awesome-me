type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type Length<T extends unknown[]> = T['length']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
