function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var ServiceWorkerClass =
/*#__PURE__*/
function () {
  function ServiceWorkerClass() {
    classCallCheck(this, ServiceWorkerClass);
  }

  createClass(ServiceWorkerClass, null, [{
    key: "run",
    value: function run() {
      addEventListener("install", ServiceWorkerClass.onInstalled);
      addEventListener("fetch", ServiceWorkerClass.onFetched);
      addEventListener("register", ServiceWorkerClass.onRegister);
    }
  }, {
    key: "onInstalled",
    value: function onInstalled(event) {//   event.waitUntil(
      //       caches.open('v0.1').then((cache) => {
      //           return cache.addAll([
      //               '/scripts/app-bundle.js',
      //               '/scripts/vendor-bundle.js',
      //               '/assets/images/logo.png',
      //               '/assets/images/no-vessel-picture.jpg',
      //               '/assets/styles/loader.css',
      //               '/assets/scripts/fontawesome-pro/css/fa-svg-with-js.css',
      //               '/assets/scripts/fontawesome-pro/js/fontawesome.min.js',
      //               '/assets/scripts/fontawesome-pro/js/fa-light.min.js',
      //               '/assets/scripts/fontawesome-pro/js/fa-regular.min.js',
      //               '/assets/scripts/fontawesome-pro/js/fa-solid.min.js'
      //           ]);
      //       })
      //   );
    }
  }, {
    key: "onRegister",
    value: function onRegister(event) {//   event.waitUntil(
      //       caches.open('v0.1').then((cache) => {
      //           return cache.addAll([
      //               '/scripts/app-bundle.js',
      //               '/scripts/vendor-bundle.js',
      //               '/assets/images/logo.png',
      //               '/assets/images/no-vessel-picture.jpg',
      //               '/assets/styles/loader.css',
      //               '/assets/scripts/fontawesome-pro/css/fa-svg-with-js.css',
      //               '/assets/scripts/fontawesome-pro/js/fontawesome.min.js',
      //               '/assets/scripts/fontawesome-pro/js/fa-light.min.js',
      //               '/assets/scripts/fontawesome-pro/js/fa-regular.min.js',
      //               '/assets/scripts/fontawesome-pro/js/fa-solid.min.js'
      //           ]);
      //       })
      //   );
    }
  }, {
    key: "onFetched",
    value: function onFetched(event) {
      event.respondWith(caches.match(event.request).then(function (matchResponse) {
        return matchResponse || fetch(event.request).then(function (fetchResponse) {
          return caches.open("v0.1").then(function (cache) {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      }));
    }
  }]);

  return ServiceWorkerClass;
}();

ServiceWorkerClass.run();
