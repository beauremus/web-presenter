/**
 * Framework supporting presentation controls
 * @author Beau Harrison <beauharrison@gmail.com>
 */

/**
 * Key codes
 * 13 - Enter
 * 32 - Spacebar
 * 33 - Page up
 * 34 - Page down
 * 37 - Left arrow
 * 38 - Up arrow
 * 39 - Right arrow
 * 40 - Down arrow
 */

const NEXT_EVENTS = [{name:'click'},{name:'keyup',specs:[13,32,34,39,40]}];
const PREV_EVENTS = [{name:'keyup',specs:[33,37,38]}];

for (event of NEXT_EVENTS) {
    if (event.specs) {
        for (spec of event.specs) {
            document.addEventListener(event.name, function (e) {
                if (spec === e.keyCode) {
                    console.log('e.keyCode', e.keyCode);
                }
            });
        }
    } else {
        document.addEventListener(event.name, function (e) {
            console.log('e', e);
        });
    }
}
