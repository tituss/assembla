
$(function(){
  
  enumeration_updater = function(){
    
    /*
     * gets max width of enum and updates content areas padding-left
     * based on http://design.oupnmv.com/boonc_sites/sites/oupcat3/52_explanation.pdf
     * works withouth .enum min-width so it does not need to handle the case when
     * enums are disabled. 
     */

     /* edited CB 20/07/2012 #4 */
     /* Math in previous version was wrong as it set blocks padding to block padding plus enum width.
      * even with no enum there was padding added.
      * I've switched the padding to padding-right on the enum so it can still be set in the css
      * but if enums are turned off the math equals 0 so there will be no padding added to the block
    */
    
    var blocks = $(".interaction .contentblock");
    var enums = blocks.children('.enum');
    var gap = parseInt(enums.css('padding-right'), 10);
    
    var widest = 0;
    enums.each(function(){
      if($(this).width() > widest){
        widest = $(this).width();
      }
    });
    
    blocks.css('padding-left', widest + gap);
    enums.css('width', widest);
    /* edited CB 20/07/2012 #4 */
    /* added this code back in from my example as it fixes a bug in webkit.
     * without it the width of the block will not automatically adjust for having less space due to the changing padding.
     * This means that the block will be bigger than its parent forcing it to scroll
     * You can see the glitch and how a redraw fixes it by taking this code back out and loading an example on chrome such as MCS.
     * Add in some longish custom enumeration and preview
     * The block will be too wide and force the parent to scroll
     * right click on the element and click 'inspect element'.
     * chrome/safari will decide to redraw the box, fixing the size and removing the scroll.
     * the three lines below force a redraw in the function so you never see the box at the wrong width.
     * see ticket #4 for a screenshot of the issue.
     * the fix is for webkit only but doesn't cause problems with Gecko and is quick so probably fine to leave in function as is rather than setting it to only happen on webkit browsers.
     */
    blocks.css('display','none');
    blocks.offsetHeight;
    blocks.show();

  };
  
  a5.hooks.interactionLoaded.add(enumeration_updater);
});


