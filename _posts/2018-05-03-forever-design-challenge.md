---
layout: default
title: "FOREVER Design Challenge"
date: 2018-05-03
permalink: /case-study/forever-design-challenge
---

# Creating the Photo Gallery

## Initial Research
When researching how I should approach the overall style of the gallery, I started by looking at how other photo apps approached a selection design. Apple's *Photos* app on iOS has a button at the top to show the Select View, but there's no visual change on the photos that would indicate you can select them.

<div class="hey">
  [[ iOS Photos app image ]]
</div>

Google Photos on the other hand has its select button hidden behind a menu but also, and I feel more intuitively, allows a long tap to trigger the Select View. This view does portray a visual change to all photos with an outlined transparent circle to indicate a selectable item. Both apps use a circled checkmark on the checked item, with Google Photos decreasing the size of the photo upon selection.

[[ Google Photos Image with items selected ]]

The Forever app also uses the circled checkmark as its selected indicator, so I stayed within that convention for my design.

[[ Image of checkmark icons in sketches vs final product ]]

### Animations

I knew I wanted to include animation from the beginning, but I didn't know how to design it into the app. My first thought was to have the image flip like a playing card on select, but as I thought it over, I realized it wouldn't make much sense in the context of the app. Unlike playing cards, there isn't much meaning tied to turning a photo over. We're already seeing the face so flipping it wouldn't reveal anything new. In addition to the lack of meaning, I figured the animation would create too much visual noise. It would be simply an aesthetic animation and would probably distract the user from their task.

Reducing visual noise is also the reason I toned down the checkmark animation. I thought I could have the circle almost elastically bounce in upon selection or even explode like Twitter's heart animation, but I realized quickly that any gains in delight would be diminished by the animation diverting too much attention away from continuing an action. This was partly influenced by a feature I had planned to select multiple images quickly on mobile by dragging your finger across the screen, something both Apple and Google have implemented. This feature never got added but I feel I made the right decision in keeping it out regardless.

[[ Image of multi-select sketch notes ]]

## Sketch Mockups
### Inspiration
Part of my design process is logging on to Dribbble and looking at how I could approach a design visually. A lot of selection designs had a border around the outside of the image in addition to a checkmark icon. I attempted a border in the mockups but I just didn't like the way it looked, so I scrapped it. One design that caught my attention was a card selection animation by Kavita Mistry for Udacity. These also incorporated a border around the outside but added simple, modern animations to the checkmark while also animating the drop shadow to give it a bit of depth. One that caught my eye was the first box in the image.

[[ Image of Card Selection Udacity animation ]]

It encased the checkmark icon in a triangle attached to the top right corner and had it slide in once clicked. I decided to run with this idea (and the box-shadow effect) and came up with this:

[[ Image of triangle concept ]]

The selected image had a triangle similar to the Udacity design and a shadow to make it looked raised and add visual separation from the other items. I liked this idea but I couldn't seem to find a good way of creating a selectable state for the other images. Adding an outline to the triangle was either too subtle or inconsistent with the "attached to the corner" look I wanted. Modifying the opacity wasn't working out either.


### Finalized Design
In the end, I kept the drop shadow but decided to go with convention on the checkmark and encase it in a circle with outlined circles for the selectable state. However, I took inspiration from Google Photos and shrunk the size just a little bit for images in the selectable state. The affect of this was two-fold. First, the animation moves attention away from the already selected item to the rest of the items to let you know they are selectable. Second, decreasing the size increases the amount of space in between them, giving the drop shadows on the selected state more room to breathe and not clutter everything up.

[[ Image of final mockup ]]

## CodePen Unit Test
Oftentimes, in order work out a problem in isolation, I'll switch over to CodePen and mock up a unit test. I didn't want to mess around with 10 or so different images all in one go so I coded a single image to understand how it would work.

In the brief, images at a large breakpoint were required to be 150x150. I was given images of varying sizes so I had to figure out how to constrain all of them to a square. Both Apple's Photos app and Google Photos use a square grid layout so I wondered how they worked with images that didn't fit neatly inside a square. Both use the same technique: crop each image into a square from the center and reveal the full size once tapped. Any image wider or taller would show only the center and any image smaller than the square would get sized up.

I first wanted to see if I could achieve this affect by using `<img>` tags. My general rule of thumb for using img tags or background images comes down to its purpose. If it's relevant to the content, it should be an img. If it's just for decoration, use it as a background in the CSS. Unfortunately, I couldn't get the effect to work across all browsers. There is the `object-fit` CSS property which mimics `background-size` for img tags, but it's not supported in IE or the latest version of Edge. I sacrificed semantics for feature requirements and used a background image with `background-size: cover` and `background-position: 50% 50%` to crop the image to the square from the center.

[[ Link to CodePen ]]

I added a couple visual elements that weren't there in the mockups. First, I created a second drop shadow when the image is pressed. The first shadow gives it a raised effect but I wanted to give the user a feel of pushing it down, so a smaller, darker shadow was added. The other element, a Material-esque click animation, I toyed with in the mockups, but couldn't really see how it worked until I created the animation.

[[ Gif of Material button click animation ]]

I wrote it down in my notes as a feature to be included so I decided to try it out in CodePen. Surprisingly, it wasn't difficult to make; it's a circle that starts out at `transform: scale(0);` and finishes at full width and height of the image, with it's border-radius removed to make it square.

[[ Maybe slow-mo gif of clicking an image ]]

## The Working App
In order to show off my skills, I knew I wanted to do more than just the basics of HTML, CSS, and simple JS. I've worked with Webpack on multiple projects before so I started setting that up. I had a bit of trouble, however, because I was working with the newest version of Webpack (Webpack 3) which not a lot of docs and plugins are written for yet. As such, it was a bit difficult to determine if the npm script or code snippet would work with the Webpack 3 since there were a lot of changes between the 1 and 2 versions. Still, I tried my best.

I installed bootstrap-sass from npm and inserted it into my main `.scss` file. Getting that up and running was its own battle. Since Webpack was looking for the bootstrap-sass module inside of the `node_modules` folder, I had to mess with the configuration to not only have it find the correct css folder but also rewrite the URLs for the Glyphicons font files. Messing with the Webpack file test config finally did the trick.

{% highlight javascript linenos %}
{
  test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
  use: [{
      loader: "file-loader?name=[name].[ext]&outputPath=fonts/&publicPath=assets/"
  }],
}
{% endhighlight %}

After getting the font files to work properly, I was able to write my CSS. I organized the Sass files to match the SMACSS ideology (and also got some help from the Forever Style Guide Sass structure), with a folder for globals (e.g. variables), layout (header, main content), and modules (gallery item). All were imported into a main `app.scss` file.

[[ Picture of Sass file structure ]]

One problem I noticed, however, was that Webpack was taking forever to compile the CSS. Average compile time was around 2-3 seconds which doesn't seem like much, but it completely froze Atom editor for that amount of time, meaning I couldn't do any quick CSS changes. I tried to solve this by having Webpack generate a static CSS file I could reference in the document `<head>` but it didn't seem to change anything. I got frustrated and decided to move to another task.

I moved on to implementing the jQuery code I wrote in CodePen. I already had the code for handling the click event of a single item, but now I needed to account for multiple items and a selectable state for all other items when one is selected. This got me thinking about state management and I remembered that front-end frameworks like React and Vue handle state management very well. This need of handling state combined with wanting to split my HTML into reusable components (e.g. a gallery-item component), made me move towards those front-end frameworks. Vue seemed simpler than React and I didn't like React's use of JSX so I decided to go with Vue.

### Working With Vue.js
To be honest, working with Vue was much more difficult than I had imagined. I'd never developed anything with it before so I was learning on the fly. Most of the docs and Vue tutorials deal with using Vue in a CodePen-like setting where all Javascript is confined into one section without assets or single-file components. Thankfully, Vue does have configuration for a very simple Webpack-powered app that can handle assets and a folder structure. Once I got up and running with this configuration, I was able to start using Vue.

Surprisingly, Vue helped with the problems that plagued my previous attempt. It used Webpack, so I didn't have to change any config options with Bootstrap, but it also didn't have the compile time lag for CSS that I had so much trouble with earlier. Vue has the option of creating single-file components, so I was able to split the header and gallery into separate components and iterate over one chunk of HTML for each gallery item.

Handling each item's state was challenging to figure out at first because I was working with custom image objects rather than directly manipulating the DOM. But by searching through Rue's docs and Stack Overflow, I was able to code the different states the project asked for. Once an image is selected, all other images go into a selectable state. If no images are selected, then they all revert back to their original state.

[[ Gif of different states ]]

### Roadblocks with Flexbox
Originally I wanted to center the images in their container but have the last row aligned to the left. Having two items, for example, be offset from the grid and centered wasn't the optimal solution. I researched if there was any way to achieve this effect but there wasn't any single CSS property that worked. One suggestion on Stack Overflow was to create a pseudo-element on the last image and set it to `flex: auto`. The magic in here is the `flex-basis` property, which, when set to auto, takes up the remaining amount of space until the `flex-end`. It's a clever solution but it only seems to work when setting `justify-content: space-between` on the parent and not when the child elements are centered. I tried setting `margin-left: auto` on it to create a similar hack but that had the same affect of not working when elements are centered.

I came across another solution that did in fact work with `justify-content: center` but it only worked if you created empty elements to fill up the remaining space. I maybe could've written some Javascript to count the number of elements on the last line, but no matter what it would pollute the DOM with all the empty elements, which I decided wasn't worth it. In the end I just left the last items centered.

## Wrapping Up
Though it certainly had its frustrations, I learned a lot from this project, especially about Vue.js, and I'd be happy to see what I can do with the framework in the future.
