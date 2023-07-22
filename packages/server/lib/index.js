(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __rest = (this && this.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    define("utils/globals", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.HTML_DOCTYPE = void 0;
        exports.HTML_DOCTYPE = '<!DOCTYPE html>';
    });
    define("endpoints/handleGetCollectionPage", ["require", "exports", "react", "react-dom/server", "@activity-kit/utilities", "@activity-kit/endpoints", "utils/globals", "utils/globals"], function (require, exports, React, Server, utilities_1, endpoints_1, globals_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = (PageComponent) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const endpoint = new endpoints_1.EntityGetEndpoint(req.activitypub, {
                url: new URL(req.url, utilities_1.LOCAL_DOMAIN),
                returnHtml: (_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('text/html'),
            });
            const render = (_b) => __awaiter(void 0, void 0, void 0, function* () {
                var args = __rest(_b, []);
                return globals_1.HTML_DOCTYPE + Server.renderToString(React.createElement(PageComponent, Object.assign({}, args, { user: req.user })));
            });
            const result = yield endpoint.respond(render).catch((err) => {
                console.error(err);
                return {
                    statusCode: 500,
                    body: err.message,
                };
            });
            res.status(result.statusCode);
            res.send(result.body);
            res.end();
        });
    });
    define("components/Header", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement("tl-header", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/Header.css" }),
                React.createElement("header", null,
                    React.createElement("button", { className: "menu-toggle-button", type: "button" }, "Menu"),
                    React.createElement("span", null, "Welcome 2 Activityland")))));
    });
    define("components/SidebarNav", ["require", "exports", "react", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, utilities_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement("tl-sidebar-nav", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/SidebarNav.css" }),
                React.createElement("dialog", null,
                    React.createElement("div", { className: "container" },
                        React.createElement("button", { className: "close-button", type: "button" }, "Close Menu"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "/" }, "Home")),
                            user ? (React.createElement("li", null,
                                React.createElement("a", { href: (0, utilities_2.getId)(user.url).href }, "Your Profile"))) : null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "/inbox" }, "Inbox"))))))));
    });
    define("components/FollowForm", ["require", "exports", "react", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, utilities_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ follower, followee }) => (React.createElement("tl-follow-form", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/FollowForm.css" }),
                React.createElement("form", { action: (0, utilities_3.getId)(follower.outbox).href, noValidate: true },
                    React.createElement("input", { type: "hidden", name: "followee", value: (0, utilities_3.getId)(followee).href }),
                    React.createElement("input", { type: "hidden", name: "follower", value: (0, utilities_3.getId)(follower).href }),
                    React.createElement("input", { type: "hidden", name: "followers", value: (0, utilities_3.getId)(follower.followers).href }),
                    React.createElement("button", { type: "submit" }, "Follow")))));
    });
    define("pages/UserEntityPage", ["require", "exports", "react", "components/Header", "components/SidebarNav", "components/FollowForm", "@activity-kit/utilities"], function (require, exports, React, Header_1, SidebarNav_1, FollowForm_1, utilities_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => {
            return (React.createElement("html", { lang: "en" },
                React.createElement("head", null,
                    React.createElement("meta", { charSet: "utf-8" }),
                    React.createElement("title", null,
                        "@",
                        entity.preferredUsername,
                        " - Profile Page"),
                    React.createElement("link", { href: "/styles/light-dom.css", rel: "stylesheet" })),
                React.createElement("body", null,
                    React.createElement(Header_1.default, { user: user }),
                    React.createElement(SidebarNav_1.default, { user: user }),
                    React.createElement("main", null,
                        React.createElement("h1", null,
                            "@",
                            entity.preferredUsername),
                        React.createElement("dl", null,
                            React.createElement("dt", null, "Name"),
                            React.createElement("dd", null, entity.name),
                            React.createElement("dt", null, "Inbox Link"),
                            React.createElement("dd", null,
                                React.createElement("a", { href: entity.inbox instanceof URL ? entity.inbox.href : '#' }, entity.inbox instanceof URL ? 'Inbox' : 'No Inbox')),
                            React.createElement("dt", null, "Outbox Link"),
                            React.createElement("dd", null,
                                React.createElement("a", { href: entity.outbox instanceof URL ? entity.outbox.href : '#' }, entity.outbox instanceof URL ? 'Outbox' : 'No Outbox'))),
                        React.createElement("h2", null, "Follow"),
                        React.createElement(FollowForm_1.default, { follower: user, followee: entity }),
                        React.createElement("h2", null, "Followers"),
                        React.createElement("ul", null, (0, utilities_4.getArray)(entity.followers).map(follower => {
                            return (React.createElement("li", null,
                                React.createElement("a", { href: (0, utilities_4.getId)(follower).href || '#' }, (0, utilities_4.getId)(follower).href)));
                        }))),
                    React.createElement("script", { src: "/scripts/index.js", type: "module" }))));
        };
    });
    define("endpoints/handleGetUserPage", ["require", "exports", "react", "react-dom/server", "@activity-kit/utilities", "@activity-kit/endpoints", "pages/UserEntityPage", "utils/globals", "utils/globals"], function (require, exports, React, Server, utilities_5, endpoints_2, UserEntityPage_1, globals_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const endpoint = new endpoints_2.EntityGetEndpoint(req.activitypub, {
                url: new URL(req.url, utilities_5.LOCAL_DOMAIN),
                returnHtml: (_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('text/html'),
            });
            const render = (_b) => __awaiter(void 0, void 0, void 0, function* () {
                var args = __rest(_b, []);
                return globals_2.HTML_DOCTYPE + Server.renderToString(React.createElement(UserEntityPage_1.default, Object.assign({}, args, { user: req.user })));
            });
            const result = yield endpoint.respond(render).catch((err) => {
                console.error(err);
                return {
                    statusCode: 500,
                    body: err.message,
                };
            });
            res.status(result.statusCode);
            res.send(result.body);
            res.end();
        });
    });
    define("components/LoginForm", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = () => (React.createElement("tl-login-form", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/LoginForm.css" }),
                React.createElement("form", { noValidate: true },
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Username"),
                        React.createElement("input", { type: "text", name: "username", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Password"),
                        React.createElement("input", { type: "password", name: "password", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("button", { type: "submit" }, "Submit")))));
    });
    define("components/SignUpForm", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = () => (React.createElement("tl-sign-up-form", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/SignUpForm.css" }),
                React.createElement("form", { noValidate: true },
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Type"),
                        React.createElement("select", { name: "type", required: true },
                            React.createElement("option", { value: "Person", selected: true }, "Person"),
                            React.createElement("option", { value: "Person" }, "Group")),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Name"),
                        React.createElement("input", { type: "text", name: "name", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Email"),
                        React.createElement("input", { type: "text", name: "email", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Username"),
                        React.createElement("input", { type: "text", name: "username", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Password"),
                        React.createElement("input", { type: "password", name: "password", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Repeat Password"),
                        React.createElement("input", { type: "password", name: "repeat-password", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("button", { type: "submit" }, "Submit")))));
    });
    define("components/CreatePostForm", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, AP, utilities_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement("tl-create-post-form", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreatePostForm.css" }),
                React.createElement("form", { action: (0, utilities_6.getId)(user.outbox).href, noValidate: true },
                    React.createElement("select", { name: "type" }, Object.values(AP.ExtendedObjectTypes).map((type) => (React.createElement("option", { value: type, selected: type === AP.ExtendedObjectTypes.NOTE }, type)))),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Body Content"),
                        React.createElement("textarea", { name: "content", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("button", { type: "submit" }, "Submit")))));
    });
    define("pages/HomePage", ["require", "exports", "react", "components/LoginForm", "components/SignUpForm", "components/Header", "components/SidebarNav", "components/CreatePostForm"], function (require, exports, React, LoginForm_1, SignUpForm_1, Header_2, SidebarNav_2, CreatePostForm_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement("html", { lang: "en" },
            React.createElement("head", null,
                React.createElement("meta", { charSet: "utf-8" }),
                React.createElement("title", null, "Home Page"),
                React.createElement("link", { href: "/styles/light-dom.css", rel: "stylesheet" })),
            React.createElement("body", null,
                React.createElement(Header_2.default, { user: user }),
                React.createElement(SidebarNav_2.default, { user: user }),
                React.createElement("main", null, user ? (React.createElement(React.Fragment, null,
                    React.createElement("h1", null,
                        "Welcome, ",
                        user.name,
                        "!"),
                    React.createElement("h2", null, "Make a post."),
                    React.createElement(CreatePostForm_1.default, { user: user }))) : (React.createElement(React.Fragment, null,
                    React.createElement("h1", null, "Log in or sign up."),
                    React.createElement("section", { role: "region", "aria-labelledby": "login-heading" },
                        React.createElement("h2", { id: "login-heading" }, "Log In"),
                        React.createElement(LoginForm_1.default, null)),
                    React.createElement("hr", { role: "none" }),
                    React.createElement("section", { role: "region", "aria-labelledby": "signup-heading" },
                        React.createElement("h2", { id: "signup-heading" }, "Sign Up"),
                        React.createElement(SignUpForm_1.default, null))))),
                React.createElement("script", { src: "/scripts/index.js", type: "module" }))));
    });
    define("pages/InboxEntityPage", ["require", "exports", "react", "components/Header", "components/SidebarNav", "@activity-kit/utilities"], function (require, exports, React, Header_3, SidebarNav_3, utilities_7) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => {
            return (React.createElement("html", { lang: "en" },
                React.createElement("head", null,
                    React.createElement("meta", { charSet: "utf-8" }),
                    React.createElement("title", null, "Inbox - Activity Feed"),
                    React.createElement("link", { href: "/styles/light-dom.css", rel: "stylesheet" })),
                React.createElement("body", null,
                    React.createElement(Header_3.default, { user: user }),
                    React.createElement(SidebarNav_3.default, { user: user }),
                    React.createElement("main", null,
                        React.createElement("h1", null, entity.name),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: (0, utilities_7.getId)(entity.first).href }, "First Page")))),
                    React.createElement("script", { src: "/scripts/index.js", type: "module" }))));
        };
    });
    define("components/CreateNoteFeedObject", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            return (React.createElement("tl-create-note-feed-object", { role: "article" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/FeedObject.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreateNoteFeedObject.css" }),
                    React.createElement("header", null, object.summary),
                    React.createElement("dl", null,
                        React.createElement("dt", null, "Published"),
                        React.createElement("dd", null,
                            React.createElement("time", { dateTime: object.published.toISOString() }, object.published.toLocaleString()))),
                    React.createElement("p", null, object.content))));
        };
    });
    define("components/CreatePersonFeedObject", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            return (React.createElement("tl-create-person-feed-object", { role: "article" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/FeedObject.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreatePersonFeedObject.css" }),
                    React.createElement("header", null,
                        "@",
                        object.preferredUsername),
                    React.createElement("dl", null,
                        React.createElement("dt", null, "Name"),
                        React.createElement("dd", null, object.name),
                        React.createElement("dt", null, "Created"),
                        React.createElement("dd", null,
                            React.createElement("time", { dateTime: object.published.toISOString() }, object.published.toLocaleString()))),
                    React.createElement("p", null, object.summary))));
        };
    });
    define("components/CreateFeedObject", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/type-utilities", "components/CreateNoteFeedObject", "components/CreatePersonFeedObject", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, AP, type_utilities_1, CreateNoteFeedObject_1, CreatePersonFeedObject_1, utilities_8) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ activity }) => {
            const object = (0, utilities_8.getEntity)(activity.object);
            (0, type_utilities_1.assertIsApEntity)(object);
            const actor = (0, utilities_8.getEntity)(activity.actor);
            (0, type_utilities_1.assertIsApActor)(actor);
            let objectHtml = (React.createElement("p", null, `The object type "${object.type}" is not supported.`));
            if ((0, type_utilities_1.isType)(object, AP.ExtendedObjectTypes.NOTE)) {
                objectHtml = React.createElement(CreateNoteFeedObject_1.default, { object: object });
            }
            if ((0, type_utilities_1.isType)(object, AP.ActorTypes.PERSON)) {
                objectHtml = React.createElement(CreatePersonFeedObject_1.default, { object: object });
            }
            return (React.createElement("tl-create-feed-object", { role: "article" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/FeedObject.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreateFeedObject.css" }),
                    React.createElement("header", null,
                        "New ",
                        activity.type,
                        " Activity by @",
                        actor.preferredUsername,
                        " on ",
                        activity.published.toLocaleString()),
                    objectHtml)));
        };
    });
    define("components/FollowFeedObject", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/type-utilities", "components/CreateNoteFeedObject", "components/CreatePersonFeedObject", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, AP, type_utilities_2, CreateNoteFeedObject_2, CreatePersonFeedObject_2, utilities_9) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ activity }) => {
            const object = (0, utilities_9.getEntity)(activity.object);
            (0, type_utilities_2.assertIsApEntity)(object);
            const actor = (0, utilities_9.getEntity)(activity.actor);
            (0, type_utilities_2.assertIsApActor)(actor);
            let objectHtml = (React.createElement("p", null, `The object type "${object.type}" is not supported.`));
            if ((0, type_utilities_2.isType)(object, AP.ExtendedObjectTypes.NOTE)) {
                objectHtml = React.createElement(CreateNoteFeedObject_2.default, { object: object });
            }
            if ((0, type_utilities_2.isType)(object, AP.ActorTypes.PERSON)) {
                objectHtml = React.createElement(CreatePersonFeedObject_2.default, { object: object });
            }
            return (React.createElement("tl-create-feed-object", { role: "article" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/FeedObject.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreateFeedObject.css" }),
                    React.createElement("header", null,
                        "New ",
                        activity.type,
                        " Activity by @",
                        actor.preferredUsername,
                        " on ",
                        activity.published.toLocaleString()),
                    objectHtml)));
        };
    });
    define("components/FeedObject", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/type-utilities", "components/CreateFeedObject", "components/FollowFeedObject", "utils/globals"], function (require, exports, React, AP, type_utilities_3, CreateFeedObject_1, FollowFeedObject_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            let objectHtml = null;
            if ((0, type_utilities_3.isType)(object, AP.ActivityTypes.CREATE)) {
                objectHtml = React.createElement(CreateFeedObject_1.default, { activity: object });
            }
            if ((0, type_utilities_3.isType)(object, AP.ActivityTypes.FOLLOW)) {
                objectHtml = React.createElement(FollowFeedObject_1.default, { activity: object });
            }
            return (React.createElement("tl-feed-object", { role: "article" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    objectHtml)));
        };
    });
    define("components/Feed", ["require", "exports", "react", "components/FeedObject", "utils/globals"], function (require, exports, React, FeedObject_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        [];
        exports.default = ({ collection }) => {
            const unorderedItems = collection.items ? (Array.isArray(collection.items) ? collection.items : [collection.items]) : [];
            const orderedItems = collection.orderedItems ? (Array.isArray(collection.orderedItems) ? collection.orderedItems : [collection.orderedItems]) : [];
            const items = orderedItems.length ? orderedItems : unorderedItems;
            const castIsLinkType = (item) => {
                const types = Array.isArray(item.type) ? item.type : [item.type];
                return types.includes('Link') || types.includes('Mention');
            };
            return (React.createElement("tl-feed", { role: "feed" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CollectionFeed.css" }),
                    items.map((item) => {
                        if (typeof item === 'string' || item instanceof URL) {
                            throw new Error(`Received the Object's ID instead of the Object.`);
                        }
                        if (castIsLinkType(item)) {
                            throw new Error(`Received a Link instead of an Object.`);
                        }
                        return (React.createElement(FeedObject_1.default, { key: item.id.href, object: item }));
                    }))));
        };
    });
    define("pages/InboxPageEntityPage", ["require", "exports", "react", "components/Header", "components/SidebarNav", "components/Feed"], function (require, exports, React, Header_4, SidebarNav_4, Feed_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => {
            return (React.createElement("html", { lang: "en" },
                React.createElement("head", null,
                    React.createElement("meta", { charSet: "utf-8" }),
                    React.createElement("title", null, "Inbox - Activity Feed"),
                    React.createElement("link", { href: "/styles/light-dom.css", rel: "stylesheet" })),
                React.createElement("body", null,
                    React.createElement(Header_4.default, { user: user }),
                    React.createElement(SidebarNav_4.default, { user: user }),
                    React.createElement("main", null,
                        React.createElement("h1", null, entity.name),
                        React.createElement(Feed_1.default, { collection: entity })),
                    React.createElement("script", { src: "/scripts/index.js", type: "module" }))));
        };
    });
    define("index", ["require", "exports", "react", "react-dom/server", "express", "body-parser", "fs", "cookie-parser", "mongodb", "@activity-kit/db-mongo", "@activity-kit/auth-token", "@activity-kit/crypto-node", "@activity-kit/storage-ftp", "@activity-kit/endpoints", "@activity-kit/core", "@activity-kit/utilities", "utils/globals", "endpoints/handleGetCollectionPage", "endpoints/handleGetUserPage", "pages/HomePage", "pages/InboxEntityPage", "pages/InboxPageEntityPage", "pages/InboxEntityPage", "pages/InboxPageEntityPage"], function (require, exports, React, Server, express, bodyParser, fs, cookies, mongodb_1, db_mongo_1, auth_token_1, crypto_node_1, storage_ftp_1, endpoints_3, core_1, utilities_10, globals_3, handleGetCollectionPage_1, handleGetUserPage_1, HomePage_1, InboxEntityPage_1, InboxPageEntityPage_1, InboxEntityPage_2, InboxPageEntityPage_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        (() => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const app = express();
            app.use(bodyParser.urlencoded({ extended: true, }));
            app.use(bodyParser.json({ type: 'application/activity+json', }));
            app.use(cookies());
            app.use('/scripts', express.static(fs.realpathSync('../../node_modules/@timeline/client/lib')));
            app.use('/styles', express.static('./styles'));
            const ftpStorageAdapter = new storage_ftp_1.FtpStorageAdapter(Object.assign(Object.assign({}, JSON.parse(decodeURIComponent('%7B%22host%22%3A%22media.michaelpuckett.engineer%22%2C%22user%22%3A%22uploads%40media.michaelpuckett.engineer%22%2C%22password%22%3A%22Ag3nt106!%22%7D'))), { path: '/uploads' }));
            const mongoClient = new mongodb_1.MongoClient((_a = process.env.AP_MONGO_CLIENT_URL) !== null && _a !== void 0 ? _a : 'mongodb://127.0.0.1:27017');
            yield mongoClient.connect();
            const mongoDb = mongoClient.db((_b = process.env.AP_MONGO_DB_NAME) !== null && _b !== void 0 ? _b : 'activitypub2');
            const mongoDbAdapter = new db_mongo_1.MongoDbAdapter(mongoDb);
            const nodeCryptoAdapter = new crypto_node_1.NodeCryptoAdapter();
            const tokenAuthAdapter = new auth_token_1.TokenAuthAdapter({
                db: mongoDbAdapter,
                crypto: nodeCryptoAdapter,
            });
            const core = new core_1.Core({
                auth: tokenAuthAdapter,
                crypto: nodeCryptoAdapter,
                db: mongoDbAdapter,
                storage: ftpStorageAdapter,
            });
            app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                req.activitypub = core;
                const { __session: token } = req.cookies;
                const userId = yield req.activitypub.getUserIdByToken(token);
                const user = yield req.activitypub.getActorByUserId(userId);
                req.user = user;
                next();
            }));
            app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                res.send(globals_3.HTML_DOCTYPE + Server.renderToString(React.createElement(HomePage_1.default, { user: req.user })));
                res.end();
            }));
            app.get('/@:username/inbox', (0, handleGetCollectionPage_1.default)(InboxEntityPage_1.default));
            app.get('/@:username/inbox/page/:page', (0, handleGetCollectionPage_1.default)(InboxPageEntityPage_1.default));
            app.get('/@:username/outbox', (0, handleGetCollectionPage_1.default)(InboxEntityPage_2.default));
            app.get('/@:username/outbox/page/:page', (0, handleGetCollectionPage_1.default)(InboxPageEntityPage_2.default));
            app.get('/@:username', handleGetUserPage_1.default);
            app.post('/@:username/outbox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!req.user) {
                    res.status(401);
                    res.end();
                    return;
                }
                const endpoint = new endpoints_3.OutboxPostEndpoint(core, {
                    body: req.body,
                    url: new URL(req.url, utilities_10.LOCAL_DOMAIN),
                    actor: req.user,
                    routes: utilities_10.DEFAULT_ROUTES,
                });
                const result = yield endpoint.respond();
                res.status(result.statusCode);
                if (result.location) {
                    res.set('Location', result.location);
                }
                res.end();
            }));
            app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const endpoint = new endpoints_3.UserPostEndpoint(core, {
                    body: req.body,
                    routes: utilities_10.DEFAULT_ROUTES,
                });
                const result = yield endpoint.respond();
                res.status(result.statusCode);
                res.send(result.body);
                res.end();
            }));
            app.listen(3000, () => {
                console.log('Running...');
            });
        }))();
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        if (typeof define.factory !== 'function') {
            return define.factory;
        }
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();