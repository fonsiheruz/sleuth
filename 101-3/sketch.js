/*

Officer: 2323603
CaseNum: 101-3-12626384-2323603

Case 101 - The Case of Anna Lovelace
Stage 4 - The Plaza Hotel

Okay this place is more Anna’s style. Now’s our chance to find out the root of all
of this. Lets see who is Anna meeting.

Identify Anna by drawing a Dark Green filled rectangle with a Forest Green outline.
She’s the woman in the red dress of course.

Identify the man with the monocle smoking the cigar by drawing a Sienna filled
rectangle with a Medium Purple outline around him.

Identify the man reading the newspaper by drawing a Medium Turquoise filled rectangle
with a Royal Blue outline around him.

Identify the woman with the dog by drawing a Cyan filled rectangle with a
Yellow Green outline around her. Make sure you include the dog too.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.
  stroke() Use r,g,b values between 0 and 255.

*/

var img;

function preload() {
  img = loadImage("img.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  strokeWeight(2);
}

function draw() {
  image(img, 0, 0);

  //Write your code below here ...
  // Anna
  // Dark Green filled rectangle with a Forest Green outline
  fill(0, 100, 0);
  stroke(34, 139, 34);
  rect(815, 368, 1045 - 815, 837 - 368);

  // The man with the monocle smoking the cigar
  // Sienna filled rectangle with a Medium Purple outline
  fill(160, 82, 45);
  stroke(147, 112, 219);
  rect(1438, 499, 1622 - 1438, 751 - 499);

  // The man reading the newspaper
  // Medium Turquoise filled rectangle with a Royal Blue outline
  fill(72, 209, 204);
  stroke(65, 105, 225);
  rect(563, 390, 695 - 563, 653 - 390);

  // The woman with the dog
  // Cyan filled rectangle with a Yellow Green outline
  fill(0, 255, 255);
  stroke(154, 205, 50);
  rect(1667, 328, 1863 - 1667, 757 - 328);

  //A helpful mouse pointer
  push();
  fill(0);
  noStroke();
  text(mouseX + "," + mouseY, mouseX, mouseY);
  pop();
}
