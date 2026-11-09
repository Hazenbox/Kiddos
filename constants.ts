import { LearningItem, LearningExample } from './types';

export const THEME_COLORS = {
  green:  'var(--k-green)',
  blue:   'var(--k-blue)',
  yellow: 'var(--k-yellow)',
  purple: 'var(--k-purple)',
  pink:   'var(--k-pink)',
  orange: 'var(--k-orange)',
  red:    'var(--k-red)',
  teal:   'var(--k-teal)',
};

export const ALPHABET_DATA: Record<string, LearningItem> = {
  'A': {
    key: 'A',
    type: 'letter',
    color: 'bg-k-orange',
    gradient: 'bg-k-orange',
    examples: [
      { word: 'Apple', imageUrl: '/images/apple.jpg' },
      { word: 'Ant', imageUrl: '/images/ant.jpg' },
      { word: 'Airplane', imageUrl: '/images/airplane.jpg' },
      { word: 'Astronaut', imageUrl: '/images/astronaut.jpg' }
    ]
  },
  'B': {
    key: 'B',
    type: 'letter',
    color: 'bg-k-blue',
    gradient: 'bg-k-blue',
    examples: [
      { word: 'Bear', imageUrl: '/images/bear.jpg' },
      { word: 'Ball', imageUrl: '/images/ball.jpg' },
      { word: 'Butterfly', imageUrl: '/images/butterfly.jpg' },
      { word: 'Banana', imageUrl: '/images/banana.jpg' }
    ]
  },
  'C': {
    key: 'C',
    type: 'letter',
    color: 'bg-k-purple',
    gradient: 'bg-k-purple',
    examples: [
      { word: 'Cat', imageUrl: '/images/cat.jpg' },
      { word: 'Car', imageUrl: '/images/car.jpg' },
      { word: 'Cake', imageUrl: '/images/cake.jpg' },
      { word: 'Cloud', imageUrl: '/images/cloud.jpg' }
    ]
  },
  'D': {
    key: 'D',
    type: 'letter',
    color: 'bg-k-green',
    gradient: 'bg-k-green',
    examples: [
      { word: 'Dog', imageUrl: '/images/dog.jpg' },
      { word: 'Duck', imageUrl: '/images/duck.jpg' },
      { word: 'Dolphin', imageUrl: '/images/dolphin.jpg' },
      { word: 'Drum', imageUrl: '/images/drum.jpg' }
    ]
  },
  'E': {
    key: 'E',
    type: 'letter',
    color: 'bg-k-pink',
    gradient: 'bg-k-pink',
    examples: [
      { word: 'Elephant', imageUrl: '/images/elephant.jpg' },
      { word: 'Egg', imageUrl: '/images/egg.jpg' },
      { word: 'Eagle', imageUrl: '/images/eagle.jpg' },
      { word: 'Earth', imageUrl: '/images/earth.jpg' }
    ]
  },
  'F': {
    key: 'F',
    type: 'letter',
    color: 'bg-k-yellow',
    gradient: 'bg-k-yellow',
    examples: [
      { word: 'Fish', imageUrl: '/images/fish.jpg' },
      { word: 'Frog', imageUrl: '/images/frog.jpg' },
      { word: 'Flower', imageUrl: '/images/flower.jpg' },
      { word: 'Fox', imageUrl: '/images/fox.jpg' }
    ]
  },
  'G': {
    key: 'G',
    type: 'letter',
    color: 'bg-k-green',
    gradient: 'bg-k-green',
    examples: [
      { word: 'Giraffe', imageUrl: '/images/giraffe.jpg' },
      { word: 'Grapes', imageUrl: '/images/grapes.jpg' },
      { word: 'Goat', imageUrl: '/images/goat.jpg' },
      { word: 'Guitar', imageUrl: '/images/guitar.jpg' }
    ]
  },
  'H': {
    key: 'H',
    type: 'letter',
    color: 'bg-k-indigo',
    gradient: 'bg-k-indigo',
    examples: [
      { word: 'Horse', imageUrl: '/images/horse.jpg' },
      { word: 'House', imageUrl: '/images/house.jpg' },
      { word: 'Hat', imageUrl: '/images/hat.jpg' },
      { word: 'Hippo', imageUrl: '/images/hippo.jpg' }
    ]
  },
  'I': {
    key: 'I',
    type: 'letter',
    color: 'bg-k-red',
    gradient: 'bg-k-red',
    examples: [
      { word: 'Ice Cream', imageUrl: '/images/icecream.jpg' },
      { word: 'Igloo', imageUrl: '/images/igloo.jpg' },
      { word: 'Iguana', imageUrl: '/images/iguana.jpg' },
      { word: 'Island', imageUrl: '/images/island.jpg' }
    ]
  },
  'J': {
    key: 'J',
    type: 'letter',
    color: 'bg-k-teal',
    gradient: 'bg-k-teal',
    examples: [
      { word: 'Jellyfish', imageUrl: '/images/jellyfish.jpg' },
      { word: 'Juice', imageUrl: '/images/juice.jpg' },
      { word: 'Jump', imageUrl: '/images/jump.jpg' },
      { word: 'Jaguar', imageUrl: '/images/jaguar.jpg' }
    ]
  },
  'K': {
    key: 'K',
    type: 'letter',
    color: 'bg-k-orange',
    gradient: 'bg-k-orange',
    examples: [
      { word: 'Kangaroo', imageUrl: '/images/kangaroo.jpg' },
      { word: 'Kite', imageUrl: '/images/kite.jpg' },
      { word: 'Koala', imageUrl: '/images/koala.jpg' },
      { word: 'King', imageUrl: '/images/king.jpg' }
    ]
  },
  'L': {
    key: 'L',
    type: 'letter',
    color: 'bg-k-green',
    gradient: 'bg-k-green',
    examples: [
      { word: 'Lion', imageUrl: '/images/lion.jpg' },
      { word: 'Lemon', imageUrl: '/images/lemon.jpg' },
      { word: 'Leaf', imageUrl: '/images/leaf.jpg' },
      { word: 'Lamp', imageUrl: '/images/lamp.jpg' }
    ]
  },
  'M': {
    key: 'M',
    type: 'letter',
    color: 'bg-k-purple',
    gradient: 'bg-k-purple',
    examples: [
      { word: 'Monkey', imageUrl: '/images/monkey.jpg' },
      { word: 'Moon', imageUrl: '/images/moon.jpg' },
      { word: 'Milk', imageUrl: '/images/milk.jpg' },
      { word: 'Mouse', imageUrl: '/images/mouse.jpg' }
    ]
  },
  'N': {
    key: 'N',
    type: 'letter',
    color: 'bg-k-yellow',
    gradient: 'bg-k-yellow',
    examples: [
      { word: 'Nest', imageUrl: '/images/nest.jpg' },
      { word: 'Notebook', imageUrl: '/images/notebook.jpg' },
      { word: 'Nose', imageUrl: '/images/nose.jpg' },
      { word: 'Nurse', imageUrl: '/images/nurse.jpg' }
    ]
  },
  'O': {
    key: 'O',
    type: 'letter',
    color: 'bg-k-orange',
    gradient: 'bg-k-orange',
    examples: [
      { word: 'Orange', imageUrl: '/images/orange.jpg' },
      { word: 'Owl', imageUrl: '/images/owl.jpg' },
      { word: 'Octopus', imageUrl: '/images/octopus.jpg' },
      { word: 'Ocean', imageUrl: '/images/ocean.jpg' }
    ]
  },
  'P': {
    key: 'P',
    type: 'letter',
    color: 'bg-k-pink',
    gradient: 'bg-k-pink',
    examples: [
      { word: 'Penguin', imageUrl: '/images/penguin.jpg' },
      { word: 'Panda', imageUrl: '/images/panda.jpg' },
      { word: 'Piano', imageUrl: '/images/piano.jpg' },
      { word: 'Pizza', imageUrl: '/images/pizza.jpg' }
    ]
  },
  'Q': {
    key: 'Q',
    type: 'letter',
    color: 'bg-k-indigo',
    gradient: 'bg-k-indigo',
    examples: [
      { word: 'Queen', imageUrl: '/images/queen.jpg' },
      { word: 'Quilt', imageUrl: '/images/quilt.jpg' },
      { word: 'Quokka', imageUrl: '/images/quokka.jpg' },
      { word: 'Quartz', imageUrl: '/images/quartz.jpg' }
    ]
  },
  'R': {
    key: 'R',
    type: 'letter',
    color: 'bg-k-red',
    gradient: 'bg-k-red',
    examples: [
      { word: 'Rabbit', imageUrl: '/images/rabbit.jpg' },
      { word: 'Rocket', imageUrl: '/images/rocket.jpg' },
      { word: 'Rainbow', imageUrl: '/images/rainbow.jpg' },
      { word: 'Robot', imageUrl: '/images/robot.jpg' }
    ]
  },
  'S': {
    key: 'S',
    type: 'letter',
    color: 'bg-k-blue',
    gradient: 'bg-k-blue',
    examples: [
      { word: 'Sun', imageUrl: '/images/sun.jpg' },
      { word: 'Snake', imageUrl: '/images/snake.jpg' },
      { word: 'Star', imageUrl: '/images/star.jpg' },
      { word: 'Ship', imageUrl: '/images/ship.jpg' }
    ]
  },
  'T': {
    key: 'T',
    type: 'letter',
    color: 'bg-k-teal',
    gradient: 'bg-k-teal',
    examples: [
      { word: 'Tiger', imageUrl: '/images/tiger.jpg' },
      { word: 'Train', imageUrl: '/images/train.jpg' },
      { word: 'Tree', imageUrl: '/images/tree.jpg' },
      { word: 'Turtle', imageUrl: '/images/turtle.jpg' }
    ]
  },
  'U': {
    key: 'U',
    type: 'letter',
    color: 'bg-k-purple',
    gradient: 'bg-k-purple',
    examples: [
      { word: 'Umbrella', imageUrl: '/images/umbrella.jpg' },
      { word: 'Unicorn', imageUrl: '/images/unicorn.jpg' },
      { word: 'Urchin', imageUrl: '/images/urchin.jpg' },
      { word: 'Utensils', imageUrl: '/images/utensils.jpg' }
    ]
  },
  'V': {
    key: 'V',
    type: 'letter',
    color: 'bg-k-rose',
    gradient: 'bg-k-rose',
    examples: [
      { word: 'Van', imageUrl: '/images/van.jpg' },
      { word: 'Violin', imageUrl: '/images/violin.jpg' },
      { word: 'Vase', imageUrl: '/images/vase.jpg' },
      { word: 'Volcano', imageUrl: '/images/volcano.jpg' }
    ]
  },
  'W': {
    key: 'W',
    type: 'letter',
    color: 'bg-k-blue',
    gradient: 'bg-k-blue',
    examples: [
      { word: 'Whale', imageUrl: '/images/whale.jpg' },
      { word: 'Water', imageUrl: '/images/water.jpg' },
      { word: 'Watch', imageUrl: '/images/watch.jpg' },
      { word: 'Wolf', imageUrl: '/images/wolf.jpg' }
    ]
  },
  'X': {
    key: 'X',
    type: 'letter',
    color: 'bg-k-orange',
    gradient: 'bg-k-orange',
    examples: [
      { word: 'Xylophone', imageUrl: '/images/xylophone.jpg' },
      { word: 'X-Ray', imageUrl: '/images/xray.jpg' },
      { word: 'X-Mas', imageUrl: '/images/xmas.jpg' },
      { word: 'Xerus', imageUrl: '/images/xerus.jpg' }
    ]
  },
  'Y': {
    key: 'Y',
    type: 'letter',
    color: 'bg-k-yellow',
    gradient: 'bg-k-yellow',
    examples: [
      { word: 'Yak', imageUrl: '/images/yak.jpg' },
      { word: 'Yacht', imageUrl: '/images/yacht.jpg' },
      { word: 'Yellow', imageUrl: '/images/yellow.jpg' },
      { word: 'Yogurt', imageUrl: '/images/yogurt.jpg' }
    ]
  },
  'Z': {
    key: 'Z',
    type: 'letter',
    color: 'bg-k-green',
    gradient: 'bg-k-green',
    examples: [
      { word: 'Zebra', imageUrl: '/images/zebra.jpg' },
      { word: 'Zoo', imageUrl: '/images/zoo.jpg' },
      { word: 'Zipper', imageUrl: '/images/zipper.jpg' },
      { word: 'Zucchini', imageUrl: '/images/zucchini.jpg' }
    ]
  }
};

// 10 crayon-box colors cycling every 10 numbers
const NUMBER_COLORS = [
  'bg-k-red',    // 1
  'bg-k-orange', // 2
  'bg-k-yellow', // 3
  'bg-k-green',  // 4
  'bg-k-teal',   // 5
  'bg-k-blue',   // 6
  'bg-k-indigo', // 7
  'bg-k-purple', // 8
  'bg-k-pink',   // 9
  'bg-k-rose',   // 10
];

const NUMBER_GRADIENTS = [
  'bg-k-red',
  'bg-k-orange',
  'bg-k-yellow',
  'bg-k-green',
  'bg-k-teal',
  'bg-k-blue',
  'bg-k-indigo',
  'bg-k-purple',
  'bg-k-pink',
  'bg-k-rose',
];

// Curated count examples for 1-10
const COUNT_EXAMPLES_1_TO_10: Record<number, LearningExample[]> = {
  1: [
    { word: '1 Sun', imageUrl: '/images/sun.jpg' },
    { word: '1 Apple', imageUrl: '/images/apple.jpg' },
    { word: '1 Ball', imageUrl: '/images/ball.jpg' }
  ],
  2: [
    { word: '2 Ducks', imageUrl: '/images/duck.jpg' },
    { word: '2 Apples', imageUrl: '/images/apple.jpg' },
    { word: '2 Cherries', imageUrl: '/images/cherry.jpg' }
  ],
  3: [
    { word: '3 Stars', imageUrl: '/images/star.jpg' },
    { word: '3 Bananas', imageUrl: '/images/banana.jpg' },
    { word: '3 Fish', imageUrl: '/images/fish.jpg' }
  ],
  4: [
    { word: '4 Wheels', imageUrl: '/images/car.jpg' },
    { word: '4 Flowers', imageUrl: '/images/flower.jpg' },
    { word: '4 Dogs', imageUrl: '/images/dog.jpg' }
  ],
  5: [
    { word: '5 Stars', imageUrl: '/images/star.jpg' },
    { word: '5 Apples', imageUrl: '/images/apple.jpg' },
    { word: '5 Ducks', imageUrl: '/images/duck.jpg' }
  ],
  6: [
    { word: '6 Eggs', imageUrl: '/images/egg.jpg' },
    { word: '6 Flowers', imageUrl: '/images/flower.jpg' },
    { word: '6 Carrots', imageUrl: '/images/carrot.jpg' }
  ],
  7: [
    { word: '7 Rainbow Colors', imageUrl: '/images/rainbow.jpg' },
    { word: '7 Stars', imageUrl: '/images/star.jpg' },
    { word: '7 Butterflies', imageUrl: '/images/butterfly.jpg' }
  ],
  8: [
    { word: '8 Octopus Arms', imageUrl: '/images/octopus.jpg' },
    { word: '8 Flowers', imageUrl: '/images/flower.jpg' },
    { word: '8 Grapes', imageUrl: '/images/grapes.jpg' }
  ],
  9: [
    { word: '9 Stars', imageUrl: '/images/star.jpg' },
    { word: '9 Berries', imageUrl: '/images/cherry.jpg' },
    { word: '9 Fish', imageUrl: '/images/fish.jpg' }
  ],
  10: [
    { word: '10 Apples', imageUrl: '/images/apple.jpg' },
    { word: '10 Stars', imageUrl: '/images/star.jpg' },
    { word: '10 Flowers', imageUrl: '/images/flower.jpg' }
  ]
};

// Generate Numbers 1-100 with repeating 10 rainbow colors; counts shown only for 1-10
export const NUMBER_DATA: Record<string, LearningItem> = {};
for (let i = 1; i <= 100; i++) {
  const key = i.toString();
  const colorIndex = (i - 1) % 10;
  NUMBER_DATA[key] = {
    key,
    type: 'number',
    color: NUMBER_COLORS[colorIndex],
    gradient: NUMBER_GRADIENTS[colorIndex],
    examples: i <= 10 ? (COUNT_EXAMPLES_1_TO_10[i] || []) : []
  };
}

// Curated authentic category lists (expanded with animals & birds, fruits, Indian vegetables & greens, colors)
const animalsList = [
  { word: 'Lion', url: '/images/lion.jpg' },
  { word: 'Tiger', url: '/images/tiger.jpg' },
  { word: 'Elephant', url: '/images/elephant.jpg' },
  { word: 'Giraffe', url: '/images/giraffe.jpg' },
  { word: 'Zebra', url: '/images/zebra.jpg' },
  { word: 'Monkey', url: '/images/monkey.jpg' },
  { word: 'Bear', url: '/images/bear.jpg' },
  { word: 'Peacock', url: '/images/peacock.jpg' },
  { word: 'Parrot', url: '/images/parrot.jpg' },
  { word: 'Flamingo', url: '/images/flamingo.jpg' },
  { word: 'Toucan', url: '/images/toucan.jpg' },
  { word: 'Swan', url: '/images/swan.jpg' },
  { word: 'Deer', url: '/images/deer.jpg' },
  { word: 'Fox', url: '/images/fox.jpg' },
  { word: 'Rabbit', url: '/images/rabbit.jpg' },
  { word: 'Dog', url: '/images/dog.jpg' },
  { word: 'Cat', url: '/images/cat.jpg' },
  { word: 'Horse', url: '/images/horse.jpg' },
  { word: 'Duck', url: '/images/duck.jpg' },
  { word: 'Penguin', url: '/images/penguin.jpg' },
  { word: 'Dolphin', url: '/images/dolphin.jpg' },
  { word: 'Panda', url: '/images/panda.jpg' },
  { word: 'Koala', url: '/images/koala.jpg' },
  { word: 'Kangaroo', url: '/images/kangaroo.jpg' },
  { word: 'Owl', url: '/images/owl.jpg' },
  { word: 'Turtle', url: '/images/turtle.jpg' },
  { word: 'Whale', url: '/images/whale.jpg' },
  { word: 'Hippo', url: '/images/hippo.jpg' },
  { word: 'Wolf', url: '/images/wolf.jpg' },
  { word: 'Eagle', url: '/images/eagle.jpg' }
];

const fruitsList = [
  { word: 'Apple', url: '/images/apple.jpg' },
  { word: 'Banana', url: '/images/banana.jpg' },
  { word: 'Orange', url: '/images/orange.jpg' },
  { word: 'Grapes', url: '/images/grapes.jpg' },
  { word: 'Strawberry', url: '/images/strawberry.jpg' },
  { word: 'Watermelon', url: '/images/watermelon.jpg' },
  { word: 'Mango', url: '/images/mango.jpg' },
  { word: 'Pineapple', url: '/images/pineapple.jpg' },
  { word: 'Papaya', url: '/images/papaya.jpg' },
  { word: 'Pomegranate', url: '/images/pomegranate.jpg' },
  { word: 'Kiwi', url: '/images/kiwi.jpg' },
  { word: 'Blueberry', url: '/images/blueberry.jpg' },
  { word: 'Coconut', url: '/images/coconut.jpg' },
  { word: 'Pear', url: '/images/pear.jpg' },
  { word: 'Lemon', url: '/images/lemon.jpg' },
  { word: 'Peach', url: '/images/peach.jpg' },
  { word: 'Cherry', url: '/images/cherry.jpg' },
  { word: 'Avocado', url: '/images/avocado.jpg' }
];

const vegetablesList = [
  { word: 'Carrot', url: '/images/carrot.jpg' },
  { word: 'Tomato', url: '/images/tomato.jpg' },
  { word: 'Potato', url: '/images/potato.jpg' },
  { word: 'Okra (Bhindi)', url: '/images/okra.jpg' },
  { word: 'Eggplant (Baingan)', url: '/images/eggplant.jpg' },
  { word: 'Cauliflower (Gobi)', url: '/images/cauliflower.jpg' },
  { word: 'Spinach (Palak)', url: '/images/spinach.jpg' },
  { word: 'Coriander (Dhania)', url: '/images/coriander.jpg' },
  { word: 'Mint (Pudina)', url: '/images/mint.jpg' },
  { word: 'Ginger (Adrak)', url: '/images/ginger.jpg' },
  { word: 'Garlic (Lahsun)', url: '/images/garlic.jpg' },
  { word: 'Onion (Pyaaz)', url: '/images/onion.jpg' },
  { word: 'Capsicum (Shimla Mirch)', url: '/images/capsicum.jpg' },
  { word: 'Beetroot (Chukandar)', url: '/images/beetroot.jpg' },
  { word: 'Radish (Mooli)', url: '/images/radish.jpg' },
  { word: 'Corn', url: '/images/corn.jpg' },
  { word: 'Peas', url: '/images/peas.jpg' },
  { word: 'Broccoli', url: '/images/broccoli.jpg' },
  { word: 'Cucumber', url: '/images/cucumber.jpg' },
  { word: 'Pumpkin', url: '/images/pumpkin.jpg' },
  { word: 'Zucchini', url: '/images/zucchini.jpg' },
  { word: 'Mushroom', url: '/images/mushroom.jpg' }
];

// Only colors a 5-year-old can clearly name and tell apart at a glance.
// Each is visually unmistakable from every other — no look-alike variants.
const colorsList = [
  { word: 'Red',    hex: 'hsl(5,   95%, 52%)' },  // fire-engine red
  { word: 'Orange', hex: 'hsl(28, 100%, 52%)' },  // bright orange
  { word: 'Yellow', hex: 'hsl(50, 100%, 50%)' },  // sunny yellow
  { word: 'Green',  hex: 'hsl(130,  75%, 40%)' }, // grass green
  { word: 'Blue',   hex: 'hsl(210,  95%, 52%)' }, // sky blue
  { word: 'Purple', hex: 'hsl(270,  80%, 52%)' }, // grape purple
  { word: 'Pink',   hex: 'hsl(330,  95%, 65%)' }, // bubblegum pink
  { word: 'Brown',  hex: 'hsl(25,   65%, 35%)' }, // chocolate brown
  { word: 'Black',  hex: 'hsl(0,     0%, 10%)' }, // black
  { word: 'White',  hex: 'hsl(0,     0%, 97%)' }, // white
  { word: 'Gray',   hex: 'hsl(220,  10%, 55%)' }, // clearly distinct from black & white
  { word: 'Gold',   hex: 'hsl(42,  100%, 48%)' }, // deep gold — clearly ≠ yellow
  { word: 'Sky',    hex: 'hsl(197,  85%, 70%)' }, // light sky — clearly ≠ blue
  { word: 'Maroon', hex: 'hsl(0,    75%, 30%)' }, // dark red — clearly ≠ red
  { word: 'Lime',   hex: 'hsl(90,   85%, 48%)' }, // electric lime — clearly ≠ green
  { word: 'Navy',   hex: 'hsl(225,  70%, 25%)' }, // dark navy — clearly ≠ blue
];

const shapesList = [
  { word: 'Circle', url: '/images/circle.jpg' },
  { word: 'Square', url: '/images/square.jpg' },
  { word: 'Triangle', url: '/images/triangle.jpg' },
  { word: 'Star', url: '/images/star.jpg' },
  { word: 'Heart', url: '/images/heart.jpg' }
];

export const CATEGORY_DATA: Record<string, LearningExample[]> = {
  animals: animalsList.map(item => ({ word: item.word, imageUrl: item.url })),
  fruits: fruitsList.map(item => ({ word: item.word, imageUrl: item.url })),
  vegetables: vegetablesList.map(item => ({ word: item.word, imageUrl: item.url })),
  colors: colorsList.map(c => ({ word: c.word, hex: c.hex, imageUrl: '' })),
  shapes: shapesList.map(item => ({ word: item.word, imageUrl: item.url })),
};
