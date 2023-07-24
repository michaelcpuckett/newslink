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
    define("utils/middleware", ["require", "exports", "utils/globals"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        function respondWith(result) {
            this.status(result.statusCode);
            if (result.body) {
                this.send(result.body);
            }
            else {
                if (result.location) {
                    this.set('Location', result.location);
                }
                if (result.json) {
                    this.json(result.json);
                }
            }
            this.end();
        }
        exports.default = (core) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            req.activitypub = core;
            const { __session: token } = req.cookies;
            const userId = yield req.activitypub.getUserIdByToken(token);
            const user = yield req.activitypub.getActorByUserId(userId);
            req.user = user;
            res.respondWith = respondWith.bind(res);
            next();
        });
    });
    define("endpoints/handleGetEntityPage", ["require", "exports", "react", "react-dom/server", "@activity-kit/utilities", "@activity-kit/endpoints", "utils/globals", "utils/globals"], function (require, exports, React, Server, utilities_1, endpoints_1, globals_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        function default_1(PageComponent) {
            return (req, res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const endpoint = new endpoints_1.EntityGetEndpoint(req.activitypub, {
                    url: new URL(req.url, utilities_1.LOCAL_DOMAIN),
                    returnHtml: (_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('text/html'),
                });
                const render = (_b) => __awaiter(this, void 0, void 0, function* () {
                    var args = __rest(_b, []);
                    return globals_1.HTML_DOCTYPE + Server.renderToString(React.createElement(PageComponent, Object.assign({}, args, { user: req.user })));
                });
                const result = yield endpoint.respond(render).catch((err) => {
                    console.error(err);
                    return {
                        statusCode: 500,
                        json: {
                            error: err.message,
                        }
                    };
                });
                res.respondWith(result);
            });
        }
        exports.default = default_1;
    });
    define("components/PageChrome/Header", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
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
    define("components/PageChrome/SidebarNav", ["require", "exports", "react", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, utilities_2) {
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
    define("components/PageChrome/Footer", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement("tl-footer", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/Footer.css" }))));
    });
    define("components/PageChrome/index", ["require", "exports", "react", "components/PageChrome/Header", "components/PageChrome/SidebarNav", "components/PageChrome/Footer"], function (require, exports, React, Header_1, SidebarNav_1, Footer_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ title, user, children }) => (React.createElement("html", { lang: "en" },
            React.createElement("head", null,
                React.createElement("meta", { charSet: "utf-8" }),
                React.createElement("title", null, title),
                React.createElement("link", { href: "/styles/light-dom.css", rel: "stylesheet" })),
            React.createElement("body", null,
                React.createElement(Header_1.default, { user: user }),
                React.createElement(SidebarNav_1.default, { user: user }),
                React.createElement("main", null, children),
                React.createElement(Footer_1.default, { user: user }),
                React.createElement("script", { src: "/scripts/index.js", type: "module" }))));
    });
    define("components/Forms/LoginForm", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
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
    define("components/Forms/SignUpForm", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
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
    define("components/Forms/CreatePostForm", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, AP, utilities_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement("tl-create-post-form", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreatePostForm.css" }),
                React.createElement("form", { action: (0, utilities_3.getId)(user.outbox).href, noValidate: true },
                    React.createElement("select", { name: "type" }, Object.values(AP.ExtendedObjectTypes).map((type) => (React.createElement("option", { value: type, selected: type === AP.ExtendedObjectTypes.NOTE }, type)))),
                    React.createElement("label", null,
                        React.createElement("span", { className: "label-text" }, "Body Content"),
                        React.createElement("textarea", { name: "content", required: true }),
                        React.createElement("span", { className: "error-message" })),
                    React.createElement("button", { type: "submit" }, "Submit")))));
    });
    define("pages/HomePage", ["require", "exports", "react", "components/PageChrome/index", "components/Forms/LoginForm", "components/Forms/SignUpForm", "components/Forms/CreatePostForm"], function (require, exports, React, PageChrome_1, LoginForm_1, SignUpForm_1, CreatePostForm_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ user }) => (React.createElement(PageChrome_1.default, { title: "Home Page", user: user }, user ? (React.createElement(React.Fragment, null,
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
                React.createElement(SignUpForm_1.default, null))))));
    });
    define("pages/InboxEntityPage", ["require", "exports", "react", "@activity-kit/utilities", "components/PageChrome/index"], function (require, exports, React, utilities_4, PageChrome_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => (React.createElement(PageChrome_2.default, { title: entity.name || 'Inbox', user: user },
            React.createElement("h1", null, entity.name),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { href: (0, utilities_4.getId)(entity.first).href }, "First Page")))));
    });
    define("components/Feed/Note", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            return (React.createElement("tl-feed--note", null,
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
    define("components/Feed/Person", ["require", "exports", "react", "utils/globals"], function (require, exports, React) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            return (React.createElement("tl-feed--person", null,
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
    define("components/Feed/CreateActivity", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/type-utilities", "@activity-kit/utilities", "components/Feed/Note", "components/Feed/Person", "utils/globals"], function (require, exports, React, AP, type_utilities_1, utilities_5, Note_1, Person_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ activity }) => {
            const object = (0, utilities_5.getEntity)(activity.object);
            type_utilities_1.assert.isApEntity(object);
            const actor = (0, utilities_5.getEntity)(activity.actor);
            type_utilities_1.assert.isApActor(actor);
            let objectHtml = (React.createElement("p", null, `The object type "${object.type}" is not supported.`));
            if (type_utilities_1.guard.isType(object, AP.ExtendedObjectTypes.NOTE)) {
                objectHtml = React.createElement(Note_1.default, { object: object });
            }
            if (type_utilities_1.guard.isType(object, AP.ActorTypes.PERSON)) {
                objectHtml = React.createElement(Person_1.default, { object: object });
            }
            return (React.createElement("tl-feed--create-activity", { role: "article" },
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
    define("components/Feed/FollowActivity", ["require", "exports", "react", "@activity-kit/type-utilities", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, type_utilities_2, utilities_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ activity }) => {
            const object = (0, utilities_6.getEntity)(activity.object);
            type_utilities_2.assert.isApActor(object);
            const actor = (0, utilities_6.getEntity)(activity.actor);
            type_utilities_2.assert.isApActor(actor);
            return (React.createElement("tl-feed--follow-activity", { role: "article" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/FeedObject.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CreateFeedObject.css" }),
                    React.createElement("header", null,
                        "New ",
                        activity.type,
                        " Activity by @",
                        actor.preferredUsername,
                        " on",
                        React.createElement("a", { href: (0, utilities_6.getId)(activity).href }, activity.published.toLocaleString())),
                    "To:",
                    React.createElement("a", { href: (0, utilities_6.getId)(object).href },
                        "@",
                        object.preferredUsername))));
        };
    });
    define("components/Feed/Activity", ["require", "exports", "react", "@activity-kit/types", "@activity-kit/type-utilities", "components/Feed/CreateActivity", "components/Feed/FollowActivity", "utils/globals"], function (require, exports, React, AP, type_utilities_3, CreateActivity_1, FollowActivity_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            let objectHtml = null;
            if (type_utilities_3.guard.isType(object, AP.ActivityTypes.CREATE)) {
                objectHtml = React.createElement(CreateActivity_1.default, { activity: object });
            }
            if (type_utilities_3.guard.isType(object, AP.ActivityTypes.FOLLOW)) {
                objectHtml = React.createElement(FollowActivity_1.default, { activity: object });
            }
            return (React.createElement("tl-feed--activity", null,
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    objectHtml)));
        };
    });
    define("components/Feed/Entity", ["require", "exports", "react", "@activity-kit/type-utilities", "components/Feed/Activity", "utils/globals"], function (require, exports, React, type_utilities_4, Activity_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ object }) => {
            let objectHtml = (React.createElement("p", null, `The object type "${object.type}" is not supported.`));
            if (type_utilities_4.guard.isApActivity(object)) {
                objectHtml = React.createElement(Activity_1.default, { object: object });
            }
            return (React.createElement("tl-feed--activity", null,
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    objectHtml)));
        };
    });
    define("components/Feed/index", ["require", "exports", "react", "@activity-kit/utilities", "components/Feed/Entity", "utils/globals"], function (require, exports, React, utilities_7, Entity_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ collectionPage: page }) => {
            const unorderedItems = page.items ? (Array.isArray(page.items) ? page.items : [page.items]) : [];
            const orderedItems = page.orderedItems ? (Array.isArray(page.orderedItems) ? page.orderedItems : [page.orderedItems]) : [];
            const items = orderedItems.length ? orderedItems : unorderedItems;
            return (React.createElement("tl-feed", { role: "feed" },
                React.createElement("template", { shadowrootmode: "open" },
                    React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                    React.createElement("link", { rel: "stylesheet", href: "/styles/components/CollectionFeed.css" }),
                    items.map((item) => {
                        if (typeof item === 'string' || item instanceof URL) {
                            throw new Error(`Received the Entity's ID instead of the Entity.`);
                        }
                        return (React.createElement(Entity_1.default, { key: (0, utilities_7.getId)(item).href, object: item }));
                    }))));
        };
    });
    define("pages/InboxPageEntityPage", ["require", "exports", "react", "components/PageChrome/index", "components/Feed/index"], function (require, exports, React, PageChrome_3, Feed_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => (React.createElement(PageChrome_3.default, { title: entity.name || 'Inbox', user: user },
            React.createElement("h1", null, entity.name),
            React.createElement(Feed_1.default, { collectionPage: entity })));
    });
    define("pages/FollowEntityPage", ["require", "exports", "react", "components/PageChrome/index"], function (require, exports, React, PageChrome_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => (React.createElement(PageChrome_4.default, { title: "Follow Entity", user: user },
            React.createElement("h1", null, "Follow Entity"),
            React.createElement("textarea", { defaultValue: JSON.stringify(entity, null, 2) })));
    });
    define("components/Forms/FollowForm", ["require", "exports", "react", "@activity-kit/utilities", "utils/globals"], function (require, exports, React, utilities_8) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ follower, followee }) => (React.createElement("tl-follow-form", null,
            React.createElement("template", { shadowrootmode: "open" },
                React.createElement("link", { rel: "stylesheet", href: "/styles/global.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/forms.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/buttons.css" }),
                React.createElement("link", { rel: "stylesheet", href: "/styles/components/FollowForm.css" }),
                React.createElement("form", { action: (0, utilities_8.getId)(follower.outbox).href, noValidate: true },
                    React.createElement("input", { type: "hidden", name: "followee", value: (0, utilities_8.getId)(followee).href }),
                    React.createElement("input", { type: "hidden", name: "follower", value: (0, utilities_8.getId)(follower).href }),
                    React.createElement("input", { type: "hidden", name: "followers", value: (0, utilities_8.getId)(follower.followers).href }),
                    React.createElement("button", { type: "submit" }, "Follow")))));
    });
    define("pages/UserEntityPage", ["require", "exports", "react", "@activity-kit/utilities", "components/PageChrome/index", "components/Forms/FollowForm", "components/Feed/Entity"], function (require, exports, React, utilities_9, PageChrome_5, FollowForm_1, Entity_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.default = ({ entity, user }) => {
            const getItems = (collection) => {
                if (!collection) {
                    return [];
                }
                return [...(0, utilities_9.getArray)(collection.items), ...(0, utilities_9.getArray)(collection.orderedItems)];
            };
            const posts = getItems((0, utilities_9.getEntity)(entity.outbox));
            const followers = getItems((0, utilities_9.getEntity)(entity.followers));
            const following = getItems((0, utilities_9.getEntity)(entity.following));
            const streams = entity.streams.map((stream) => {
                const entity = (0, utilities_9.getEntity)(stream);
                if (!entity) {
                    return null;
                }
                return Object.assign(Object.assign({}, entity), { items: (0, utilities_9.getArray)(entity.items), orderedItems: (0, utilities_9.getArray)(entity.orderedItems) });
            });
            return (React.createElement(PageChrome_5.default, { title: entity.name || 'User', user: user },
                React.createElement("h1", null,
                    "@",
                    entity.preferredUsername),
                React.createElement("dl", null,
                    React.createElement("dt", null, "Name"),
                    React.createElement("dd", null, entity.name),
                    React.createElement("dt", null, "Links"),
                    React.createElement("dd", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: (0, utilities_9.getId)(entity.inbox).href }, "Inbox")),
                            React.createElement("li", null,
                                React.createElement("a", { href: (0, utilities_9.getId)(entity.outbox).href }, "Outbox"))))),
                React.createElement("h2", null, "Follow"),
                React.createElement(FollowForm_1.default, { follower: user, followee: entity }),
                React.createElement("h2", null, "Followers"),
                React.createElement("ul", null, followers.map((follower) => {
                    return (React.createElement("li", { key: (0, utilities_9.getId)(follower).href },
                        React.createElement("a", { href: (0, utilities_9.getId)(follower).href }, (0, utilities_9.getId)(follower).href)));
                })),
                React.createElement("h2", null, "Following"),
                React.createElement("ul", null, following.map((followee) => {
                    return (React.createElement("li", { key: (0, utilities_9.getId)(followee).href },
                        React.createElement("a", { href: (0, utilities_9.getId)(followee).href || '#' }, (0, utilities_9.getId)(followee).href)));
                })),
                React.createElement("h2", null, "Recent Posts"),
                posts.map((post) => {
                    if (!post || post instanceof URL) {
                        return null;
                    }
                    return (React.createElement(Entity_2.default, { key: (0, utilities_9.getId)(post).href, object: post }));
                }),
                streams.map((stream) => {
                    if (!stream) {
                        return null;
                    }
                    const items = [...stream.items, ...stream.orderedItems];
                    return (React.createElement(React.Fragment, { key: stream.name },
                        React.createElement("h2", null, stream.name),
                        React.createElement("div", { role: "list" }, items.map((item) => {
                            if (item instanceof URL) {
                                return (React.createElement("a", { href: item.href }, item.href));
                            }
                            return (React.createElement(Entity_2.default, { key: (0, utilities_9.getId)(item).href, object: item }));
                        }))));
                }),
                React.createElement("textarea", { defaultValue: JSON.stringify(entity, null, 2) })));
        };
    });
    define("index", ["require", "exports", "react", "react-dom/server", "express", "body-parser", "fs", "cookie-parser", "mongodb", "@activity-kit/db-mongo", "@activity-kit/auth-token", "@activity-kit/crypto-node", "@activity-kit/storage-ftp", "@activity-kit/endpoints", "@activity-kit/core", "@activity-kit/utilities", "utils/globals", "utils/middleware", "endpoints/handleGetEntityPage", "pages/HomePage", "pages/InboxEntityPage", "pages/InboxPageEntityPage", "pages/InboxEntityPage", "pages/InboxPageEntityPage", "pages/FollowEntityPage", "pages/UserEntityPage"], function (require, exports, React, Server, express, bodyParser, fs, cookies, mongodb_1, db_mongo_1, auth_token_1, crypto_node_1, storage_ftp_1, endpoints_2, core_1, utilities_10, globals_2, middleware_1, handleGetEntityPage_1, HomePage_1, InboxEntityPage_1, InboxPageEntityPage_1, InboxEntityPage_2, InboxPageEntityPage_2, FollowEntityPage_1, UserEntityPage_1) {
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
            app.use((0, middleware_1.default)(core));
            app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                res.send(globals_2.HTML_DOCTYPE + Server.renderToString(React.createElement(HomePage_1.default, { user: req.user })));
                res.end();
            }));
            app.get('/@:username/inbox', (0, handleGetEntityPage_1.default)(InboxEntityPage_1.default));
            app.get('/@:username/inbox/page/:page', (0, handleGetEntityPage_1.default)(InboxPageEntityPage_1.default));
            app.get('/@:username/outbox', (0, handleGetEntityPage_1.default)(InboxEntityPage_2.default));
            app.get('/@:username/outbox/page/:page', (0, handleGetEntityPage_1.default)(InboxPageEntityPage_2.default));
            app.get('/follow/:guid', (0, handleGetEntityPage_1.default)(FollowEntityPage_1.default));
            app.get('/@:username', (0, handleGetEntityPage_1.default)(UserEntityPage_1.default));
            app.post('/@:username/outbox', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!req.user) {
                    res.status(401);
                    res.end();
                    return;
                }
                const endpoint = new endpoints_2.OutboxPostEndpoint(core, {
                    body: req.body,
                    url: new URL(req.url, utilities_10.LOCAL_DOMAIN),
                    actor: req.user,
                    routes: utilities_10.DEFAULT_ROUTES,
                });
                res.respondWith(yield endpoint.respond());
            }));
            app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const endpoint = new endpoints_2.UserPostEndpoint(core, {
                    body: req.body,
                    routes: utilities_10.DEFAULT_ROUTES,
                });
                res.respondWith(yield endpoint.respond());
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