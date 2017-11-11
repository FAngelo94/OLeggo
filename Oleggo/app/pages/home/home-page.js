const frameModule = require("ui/frame");

const HomeViewModel = require("./home-view-model");
const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
let page;
let pageData = new observableModule.fromObject({
    BookList: new ObservableArray(
        [{
                title: "eggs",
                author: "julian",
                image: "res://breakfast1"
            },
            {
                title: "bread",
                author: "david",
                image: "~/images/empty.png"
            },
            {
                title: "cereal",
                author: "gallego",
                image: "res://book"
            },
            {
                title: "bread",
                author: "david",
                image: "~/images/empty.png"
            },
            {
                title: "eggs",
                author: "julian",
                image: "res://breakfast1"
            },
            {
                title: "cereal",
                author: "gallego",
                image: "res://book"
            },
            {
                title: "cereal",
                author: "gallego",
                image: "res://book"
            },
            {
                title: "bread",
                author: "david",
                image: "~/images/empty.png"
            },
            {
                title: "eggs",
                author: "julian",
                image: "res://breakfast1"
            },
            {
                title: "eggs",
                author: "julian",
                image: "res://breakfast1"
            },
            {
                title: "bread",
                author: "david",
                image: "~/images/empty.png"
            },
            {
                title: "cereal",
                author: "gallego",
                image: "res://book"
            }
        ])
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
};


/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }

    const page = args.object;
    page.bindingContext = new HomeViewModel();
}

/* ***********************************************************
 * According to guidelines, if you have a drawer on your page, you should always
 * have a button that opens it. Get a reference to the RadSideDrawer view and
 * use the showDrawer() function to open the app drawer section.
 *************************************************************/
function onDrawerButtonTap(args) {
    const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

/* ***********************************************************
 * Get the current tab view title and set it as an ActionBar title.
 * Learn more about the onSelectedIndexChanged event here:
 * https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
 *************************************************************/
function onSelectedIndexChanged(args) {
    const tabView = args.object;
    const bindingContext = tabView.bindingContext;
    const selectedTabViewItem = tabView.items[args.newIndex];

    bindingContext.set("title", selectedTabViewItem.title);
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onSelectedIndexChanged = onSelectedIndexChanged;

