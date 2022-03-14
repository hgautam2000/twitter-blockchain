/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/TwitterContext.js":
/*!***********************************!*\
  !*** ./context/TwitterContext.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TwitterContext\": () => (/* binding */ TwitterContext),\n/* harmony export */   \"TwitterProvider\": () => (/* binding */ TwitterProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _library_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../library/client */ \"./library/client.js\");\n\n\n\n\nconst TwitterContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst TwitterProvider = ({ children  })=>{\n    const { 0: appStatus , 1: setAppStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const { 0: currentAccount , 1: setCurrentAccount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const { 0: currentUser , 1: setCurrentUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const { 0: tweets , 1: setTweets  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        checkIfWalletIsConnected();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!currentAccount && appStatus == 'connected') return;\n        getCurrentUserDetails(currentAccount);\n        fetchTweets();\n    }, [\n        currentAccount,\n        appStatus\n    ]);\n    /**\n   * Checks if there is an active wallet connection\n   */ const checkIfWalletIsConnected = async ()=>{\n        if (!window.ethereum) return setAppStatus('noMetaMask');\n        try {\n            const addressArray = await window.ethereum.request({\n                method: 'eth_accounts'\n            });\n            if (addressArray.length > 0) {\n                setAppStatus('connected');\n                setCurrentAccount(addressArray[0]);\n                createUserAccount(addressArray[0]);\n            } else {\n                router.push('/');\n                setAppStatus('notConnected');\n            }\n        } catch (err) {\n            router.push('/');\n            setAppStatus('error');\n        }\n    };\n    /**\n   * Initiates MetaMask wallet connection\n   */ const connectWallet = async ()=>{\n        if (!window.ethereum) return setAppStatus('noMetaMask');\n        try {\n            setAppStatus('loading');\n            const addressArray = await window.ethereum.request({\n                method: 'eth_requestAccounts'\n            });\n            if (addressArray.length > 0) {\n                setCurrentAccount(addressArray[0]);\n                createUserAccount(addressArray[0]);\n            } else {\n                router.push('/');\n                setAppStatus('notConnected');\n            }\n        } catch (err) {\n            setAppStatus('error');\n        }\n    };\n    /**\n   * Creates an account in Sanity DB if the user does not already have one\n   * @param {String} userAddress Wallet address of the currently logged in user\n   */ const createUserAccount = async (userAddress = currentAccount)=>{\n        if (!window.ethereum) return setAppStatus('noMetaMask');\n        try {\n            const userDoc = {\n                _type: 'users',\n                _id: userAddress,\n                name: 'Unnamed',\n                isProfileImageNft: false,\n                profileImage: 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',\n                walletAddress: userAddress\n            };\n            await _library_client__WEBPACK_IMPORTED_MODULE_3__.client.createIfNotExists(userDoc);\n            setAppStatus('connected');\n        } catch (error) {\n            router.push('/');\n            setAppStatus('error');\n        }\n    };\n    /**\n   * Generates NFT profile picture URL or returns the image URL if it's not an NFT\n   * @param {String} imageUri If the user has minted a profile picture, an IPFS hash; if not then the URL of their profile picture\n   * @param {Boolean} isNft Indicates whether the user has minted a profile picture\n   * @returns A full URL to the profile picture\n   */ const getNftProfileImage = async (imageUri, isNft)=>{\n        if (isNft) {\n            return `https://gateway.pinata.cloud/ipfs/${imageUri}`;\n        } else if (!isNft) {\n            return imageUri;\n        }\n    };\n    /**\n   * Gets all the tweets stored in Sanity DB.\n   */ const fetchTweets = async ()=>{\n        const query = `\n      *[_type == \"tweets\"]{\n        \"author\": author->{name, walletAddress, profileImage, isProfileImageNft},\n        tweet,\n        timestamp\n      }|order(timestamp desc)\n    `;\n        // setTweets(await client.fetch(query))\n        const sanityResponse = await _library_client__WEBPACK_IMPORTED_MODULE_3__.client.fetch(query);\n        setTweets([]);\n        /**\n     * Async await not available with for..of loops.\n     */ sanityResponse.forEach(async (item)=>{\n            const profileImageUrl = await getNftProfileImage(item.author.profileImage, item.author.isProfileImageNft);\n            if (item.author.isProfileImageNft) {\n                const newItem = {\n                    tweet: item.tweet,\n                    timestamp: item.timestamp,\n                    author: {\n                        name: item.author.name,\n                        walletAddress: item.author.walletAddress,\n                        profileImage: profileImageUrl,\n                        isProfileImageNft: item.author.isProfileImageNft\n                    }\n                };\n                setTweets((prevState)=>[\n                        ...prevState,\n                        newItem\n                    ]\n                );\n            } else {\n                setTweets((prevState)=>[\n                        ...prevState,\n                        item\n                    ]\n                );\n            }\n        });\n    };\n    /**\n   * Gets the current user details from Sanity DB.\n   * @param {String} userAccount Wallet address of the currently logged in user\n   * @returns null\n   */ const getCurrentUserDetails = async (userAccount = currentAccount)=>{\n        if (appStatus !== 'connected') return;\n        const query = `\n      *[_type == \"users\" && _id == \"${userAccount}\"]{\n        \"tweets\": tweets[]->{timestamp, tweet}|order(timestamp desc),\n        name,\n        profileImage,\n        isProfileImageNft,\n        coverImage,\n        walletAddress\n      }\n    `;\n        const response = await _library_client__WEBPACK_IMPORTED_MODULE_3__.client.fetch(query);\n        const profileImageUri = await getNftProfileImage(response[0].profileImage, response[0].isProfileImageNft);\n        setCurrentUser({\n            tweets: response[0].tweets,\n            name: response[0].name,\n            profileImage: profileImageUri,\n            walletAddress: response[0].walletAddress,\n            coverImage: response[0].coverImage,\n            isProfileImageNft: response[0].isProfileImageNft\n        });\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TwitterContext.Provider, {\n        value: {\n            appStatus,\n            currentAccount,\n            connectWallet,\n            tweets,\n            fetchTweets,\n            setAppStatus,\n            getNftProfileImage,\n            currentUser,\n            getCurrentUserDetails\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/Himanshu/Documents/twitter-blockchain-app/client/context/TwitterContext.js\",\n        lineNumber: 194,\n        columnNumber: 5\n    }, undefined));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixTQUFTLEtBQUssQ0FBVyxZQUFFLE1BQU07UUFFckMsS0FBSyxDQUFDbUMsS0FBSyxJQUFJO29DQUNpQixFQUFFVyxXQUFXLENBQUM7Ozs7Ozs7O0lBUTlDO1FBQ0EsS0FBSyxDQUFDQyxRQUFRLEdBQUcsS0FBSyxDQUFDbkQseURBQVksQ0FBQ3VDLEtBQUs7UUFFekMsS0FBSyxDQUFDYSxlQUFlLEdBQUcsS0FBSyxDQUFDaEIsa0JBQWtCLENBQzlDZSxRQUFRLENBQUMsQ0FBQyxFQUFFbkIsWUFBWSxFQUN4Qm1CLFFBQVEsQ0FBQyxDQUFDLEVBQUVwQixpQkFBaUI7UUFHL0J0QixjQUFjLENBQUMsQ0FBQztZQUNkQyxNQUFNLEVBQUV5QyxRQUFRLENBQUMsQ0FBQyxFQUFFekMsTUFBTTtZQUMxQm9CLElBQUksRUFBRXFCLFFBQVEsQ0FBQyxDQUFDLEVBQUVyQixJQUFJO1lBQ3RCRSxZQUFZLEVBQUVvQixlQUFlO1lBQzdCbkIsYUFBYSxFQUFFa0IsUUFBUSxDQUFDLENBQUMsRUFBRWxCLGFBQWE7WUFDeENvQixVQUFVLEVBQUVGLFFBQVEsQ0FBQyxDQUFDLEVBQUVFLFVBQVU7WUFDbEN0QixpQkFBaUIsRUFBRW9CLFFBQVEsQ0FBQyxDQUFDLEVBQUVwQixpQkFBaUI7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLDZFQUNIOUIsY0FBYyxDQUFDcUQsUUFBUTtRQUN0QkMsS0FBSyxFQUFFLENBQUM7WUFDTm5ELFNBQVM7WUFDVEUsY0FBYztZQUNkbUIsYUFBYTtZQUNiZixNQUFNO1lBQ05LLFdBQVc7WUFDWFYsWUFBWTtZQUNaK0Isa0JBQWtCO1lBQ2xCNUIsV0FBVztZQUNYTSxxQkFBcUI7UUFDdkIsQ0FBQztrQkFFQVgsUUFBUTs7Ozs7O0FBR2YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2NvbnRleHQvVHdpdHRlckNvbnRleHQuanM/N2RhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uL2xpYnJhcnkvY2xpZW50J1xuXG5leHBvcnQgY29uc3QgVHdpdHRlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KClcblxuZXhwb3J0IGNvbnN0IFR3aXR0ZXJQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW2FwcFN0YXR1cywgc2V0QXBwU3RhdHVzXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY3VycmVudEFjY291bnQsIHNldEN1cnJlbnRBY2NvdW50XSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbY3VycmVudFVzZXIsIHNldEN1cnJlbnRVc2VyXSA9IHVzZVN0YXRlKHt9KVxuICBjb25zdCBbdHdlZXRzLCBzZXRUd2VldHNdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjaGVja0lmV2FsbGV0SXNDb25uZWN0ZWQoKVxuICB9LCBbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghY3VycmVudEFjY291bnQgJiYgYXBwU3RhdHVzID09ICdjb25uZWN0ZWQnKSByZXR1cm5cbiAgICBnZXRDdXJyZW50VXNlckRldGFpbHMoY3VycmVudEFjY291bnQpXG4gICAgZmV0Y2hUd2VldHMoKVxuICB9LCBbY3VycmVudEFjY291bnQsIGFwcFN0YXR1c10pXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGVyZSBpcyBhbiBhY3RpdmUgd2FsbGV0IGNvbm5lY3Rpb25cbiAgICovXG4gIGNvbnN0IGNoZWNrSWZXYWxsZXRJc0Nvbm5lY3RlZCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXdpbmRvdy5ldGhlcmV1bSkgcmV0dXJuIHNldEFwcFN0YXR1cygnbm9NZXRhTWFzaycpXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFkZHJlc3NBcnJheSA9IGF3YWl0IHdpbmRvdy5ldGhlcmV1bS5yZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiAnZXRoX2FjY291bnRzJyxcbiAgICAgIH0pXG4gICAgICBpZiAoYWRkcmVzc0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2V0QXBwU3RhdHVzKCdjb25uZWN0ZWQnKVxuICAgICAgICBzZXRDdXJyZW50QWNjb3VudChhZGRyZXNzQXJyYXlbMF0pXG5cbiAgICAgICAgY3JlYXRlVXNlckFjY291bnQoYWRkcmVzc0FycmF5WzBdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgICAgICBzZXRBcHBTdGF0dXMoJ25vdENvbm5lY3RlZCcpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByb3V0ZXIucHVzaCgnLycpXG4gICAgICBzZXRBcHBTdGF0dXMoJ2Vycm9yJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIE1ldGFNYXNrIHdhbGxldCBjb25uZWN0aW9uXG4gICAqL1xuICBjb25zdCBjb25uZWN0V2FsbGV0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghd2luZG93LmV0aGVyZXVtKSByZXR1cm4gc2V0QXBwU3RhdHVzKCdub01ldGFNYXNrJylcbiAgICB0cnkge1xuICAgICAgc2V0QXBwU3RhdHVzKCdsb2FkaW5nJylcblxuICAgICAgY29uc3QgYWRkcmVzc0FycmF5ID0gYXdhaXQgd2luZG93LmV0aGVyZXVtLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6ICdldGhfcmVxdWVzdEFjY291bnRzJyxcbiAgICAgIH0pXG5cbiAgICAgIGlmIChhZGRyZXNzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXRDdXJyZW50QWNjb3VudChhZGRyZXNzQXJyYXlbMF0pXG4gICAgICAgIGNyZWF0ZVVzZXJBY2NvdW50KGFkZHJlc3NBcnJheVswXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlci5wdXNoKCcvJylcbiAgICAgICAgc2V0QXBwU3RhdHVzKCdub3RDb25uZWN0ZWQnKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgc2V0QXBwU3RhdHVzKCdlcnJvcicpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYWNjb3VudCBpbiBTYW5pdHkgREIgaWYgdGhlIHVzZXIgZG9lcyBub3QgYWxyZWFkeSBoYXZlIG9uZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXNlckFkZHJlc3MgV2FsbGV0IGFkZHJlc3Mgb2YgdGhlIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlclxuICAgKi9cbiAgY29uc3QgY3JlYXRlVXNlckFjY291bnQgPSBhc3luYyAodXNlckFkZHJlc3MgPSBjdXJyZW50QWNjb3VudCkgPT4ge1xuICAgIGlmICghd2luZG93LmV0aGVyZXVtKSByZXR1cm4gc2V0QXBwU3RhdHVzKCdub01ldGFNYXNrJylcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlckRvYyA9IHtcbiAgICAgICAgX3R5cGU6ICd1c2VycycsXG4gICAgICAgIF9pZDogdXNlckFkZHJlc3MsXG4gICAgICAgIG5hbWU6ICdVbm5hbWVkJyxcbiAgICAgICAgaXNQcm9maWxlSW1hZ2VOZnQ6IGZhbHNlLFxuICAgICAgICBwcm9maWxlSW1hZ2U6XG4gICAgICAgICAgJ2h0dHBzOi8vYWJvdXQudHdpdHRlci5jb20vY29udGVudC9kYW0vYWJvdXQtdHdpdHRlci9lbi9icmFuZC10b29sa2l0L2JyYW5kLWRvd25sb2FkLWltZy0xLmpwZy50d2ltZy4xOTIwLmpwZycsXG4gICAgICAgIHdhbGxldEFkZHJlc3M6IHVzZXJBZGRyZXNzLFxuICAgICAgfVxuXG4gICAgICBhd2FpdCBjbGllbnQuY3JlYXRlSWZOb3RFeGlzdHModXNlckRvYylcblxuICAgICAgc2V0QXBwU3RhdHVzKCdjb25uZWN0ZWQnKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByb3V0ZXIucHVzaCgnLycpXG4gICAgICBzZXRBcHBTdGF0dXMoJ2Vycm9yJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIE5GVCBwcm9maWxlIHBpY3R1cmUgVVJMIG9yIHJldHVybnMgdGhlIGltYWdlIFVSTCBpZiBpdCdzIG5vdCBhbiBORlRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGltYWdlVXJpIElmIHRoZSB1c2VyIGhhcyBtaW50ZWQgYSBwcm9maWxlIHBpY3R1cmUsIGFuIElQRlMgaGFzaDsgaWYgbm90IHRoZW4gdGhlIFVSTCBvZiB0aGVpciBwcm9maWxlIHBpY3R1cmVcbiAgICogQHBhcmFtIHtCb29sZWFufSBpc05mdCBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdXNlciBoYXMgbWludGVkIGEgcHJvZmlsZSBwaWN0dXJlXG4gICAqIEByZXR1cm5zIEEgZnVsbCBVUkwgdG8gdGhlIHByb2ZpbGUgcGljdHVyZVxuICAgKi9cbiAgY29uc3QgZ2V0TmZ0UHJvZmlsZUltYWdlID0gYXN5bmMgKGltYWdlVXJpLCBpc05mdCkgPT4ge1xuICAgIGlmIChpc05mdCkge1xuICAgICAgcmV0dXJuIGBodHRwczovL2dhdGV3YXkucGluYXRhLmNsb3VkL2lwZnMvJHtpbWFnZVVyaX1gXG4gICAgfSBlbHNlIGlmICghaXNOZnQpIHtcbiAgICAgIHJldHVybiBpbWFnZVVyaVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB0aGUgdHdlZXRzIHN0b3JlZCBpbiBTYW5pdHkgREIuXG4gICAqL1xuICBjb25zdCBmZXRjaFR3ZWV0cyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICpbX3R5cGUgPT0gXCJ0d2VldHNcIl17XG4gICAgICAgIFwiYXV0aG9yXCI6IGF1dGhvci0+e25hbWUsIHdhbGxldEFkZHJlc3MsIHByb2ZpbGVJbWFnZSwgaXNQcm9maWxlSW1hZ2VOZnR9LFxuICAgICAgICB0d2VldCxcbiAgICAgICAgdGltZXN0YW1wXG4gICAgICB9fG9yZGVyKHRpbWVzdGFtcCBkZXNjKVxuICAgIGBcblxuICAgIC8vIHNldFR3ZWV0cyhhd2FpdCBjbGllbnQuZmV0Y2gocXVlcnkpKVxuXG4gICAgY29uc3Qgc2FuaXR5UmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuZmV0Y2gocXVlcnkpXG5cbiAgICBzZXRUd2VldHMoW10pXG5cbiAgICAvKipcbiAgICAgKiBBc3luYyBhd2FpdCBub3QgYXZhaWxhYmxlIHdpdGggZm9yLi5vZiBsb29wcy5cbiAgICAgKi9cbiAgICBzYW5pdHlSZXNwb25zZS5mb3JFYWNoKGFzeW5jIGl0ZW0gPT4ge1xuICAgICAgY29uc3QgcHJvZmlsZUltYWdlVXJsID0gYXdhaXQgZ2V0TmZ0UHJvZmlsZUltYWdlKFxuICAgICAgICBpdGVtLmF1dGhvci5wcm9maWxlSW1hZ2UsXG4gICAgICAgIGl0ZW0uYXV0aG9yLmlzUHJvZmlsZUltYWdlTmZ0LFxuICAgICAgKVxuXG4gICAgICBpZiAoaXRlbS5hdXRob3IuaXNQcm9maWxlSW1hZ2VOZnQpIHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICB0d2VldDogaXRlbS50d2VldCxcbiAgICAgICAgICB0aW1lc3RhbXA6IGl0ZW0udGltZXN0YW1wLFxuICAgICAgICAgIGF1dGhvcjoge1xuICAgICAgICAgICAgbmFtZTogaXRlbS5hdXRob3IubmFtZSxcbiAgICAgICAgICAgIHdhbGxldEFkZHJlc3M6IGl0ZW0uYXV0aG9yLndhbGxldEFkZHJlc3MsXG4gICAgICAgICAgICBwcm9maWxlSW1hZ2U6IHByb2ZpbGVJbWFnZVVybCxcbiAgICAgICAgICAgIGlzUHJvZmlsZUltYWdlTmZ0OiBpdGVtLmF1dGhvci5pc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgc2V0VHdlZXRzKHByZXZTdGF0ZSA9PiBbLi4ucHJldlN0YXRlLCBuZXdJdGVtXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFR3ZWV0cyhwcmV2U3RhdGUgPT4gWy4uLnByZXZTdGF0ZSwgaXRlbV0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgZGV0YWlscyBmcm9tIFNhbml0eSBEQi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJBY2NvdW50IFdhbGxldCBhZGRyZXNzIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICogQHJldHVybnMgbnVsbFxuICAgKi9cbiAgY29uc3QgZ2V0Q3VycmVudFVzZXJEZXRhaWxzID0gYXN5bmMgKHVzZXJBY2NvdW50ID0gY3VycmVudEFjY291bnQpID0+IHtcbiAgICBpZiAoYXBwU3RhdHVzICE9PSAnY29ubmVjdGVkJykgcmV0dXJuXG5cbiAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICpbX3R5cGUgPT0gXCJ1c2Vyc1wiICYmIF9pZCA9PSBcIiR7dXNlckFjY291bnR9XCJde1xuICAgICAgICBcInR3ZWV0c1wiOiB0d2VldHNbXS0+e3RpbWVzdGFtcCwgdHdlZXR9fG9yZGVyKHRpbWVzdGFtcCBkZXNjKSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcHJvZmlsZUltYWdlLFxuICAgICAgICBpc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICAgICAgY292ZXJJbWFnZSxcbiAgICAgICAgd2FsbGV0QWRkcmVzc1xuICAgICAgfVxuICAgIGBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5mZXRjaChxdWVyeSlcblxuICAgIGNvbnN0IHByb2ZpbGVJbWFnZVVyaSA9IGF3YWl0IGdldE5mdFByb2ZpbGVJbWFnZShcbiAgICAgIHJlc3BvbnNlWzBdLnByb2ZpbGVJbWFnZSxcbiAgICAgIHJlc3BvbnNlWzBdLmlzUHJvZmlsZUltYWdlTmZ0LFxuICAgIClcblxuICAgIHNldEN1cnJlbnRVc2VyKHtcbiAgICAgIHR3ZWV0czogcmVzcG9uc2VbMF0udHdlZXRzLFxuICAgICAgbmFtZTogcmVzcG9uc2VbMF0ubmFtZSxcbiAgICAgIHByb2ZpbGVJbWFnZTogcHJvZmlsZUltYWdlVXJpLFxuICAgICAgd2FsbGV0QWRkcmVzczogcmVzcG9uc2VbMF0ud2FsbGV0QWRkcmVzcyxcbiAgICAgIGNvdmVySW1hZ2U6IHJlc3BvbnNlWzBdLmNvdmVySW1hZ2UsXG4gICAgICBpc1Byb2ZpbGVJbWFnZU5mdDogcmVzcG9uc2VbMF0uaXNQcm9maWxlSW1hZ2VOZnQsXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFR3aXR0ZXJDb250ZXh0LlByb3ZpZGVyXG4gICAgICB2YWx1ZT17e1xuICAgICAgICBhcHBTdGF0dXMsXG4gICAgICAgIGN1cnJlbnRBY2NvdW50LFxuICAgICAgICBjb25uZWN0V2FsbGV0LFxuICAgICAgICB0d2VldHMsXG4gICAgICAgIGZldGNoVHdlZXRzLFxuICAgICAgICBzZXRBcHBTdGF0dXMsXG4gICAgICAgIGdldE5mdFByb2ZpbGVJbWFnZSxcbiAgICAgICAgY3VycmVudFVzZXIsXG4gICAgICAgIGdldEN1cnJlbnRVc2VyRGV0YWlscyxcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVHdpdHRlckNvbnRleHQuUHJvdmlkZXI+XG4gIClcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiY2xpZW50IiwiVHdpdHRlckNvbnRleHQiLCJUd2l0dGVyUHJvdmlkZXIiLCJjaGlsZHJlbiIsImFwcFN0YXR1cyIsInNldEFwcFN0YXR1cyIsImN1cnJlbnRBY2NvdW50Iiwic2V0Q3VycmVudEFjY291bnQiLCJjdXJyZW50VXNlciIsInNldEN1cnJlbnRVc2VyIiwidHdlZXRzIiwic2V0VHdlZXRzIiwicm91dGVyIiwiY2hlY2tJZldhbGxldElzQ29ubmVjdGVkIiwiZ2V0Q3VycmVudFVzZXJEZXRhaWxzIiwiZmV0Y2hUd2VldHMiLCJ3aW5kb3ciLCJldGhlcmV1bSIsImFkZHJlc3NBcnJheSIsInJlcXVlc3QiLCJtZXRob2QiLCJsZW5ndGgiLCJjcmVhdGVVc2VyQWNjb3VudCIsInB1c2giLCJlcnIiLCJjb25uZWN0V2FsbGV0IiwidXNlckFkZHJlc3MiLCJ1c2VyRG9jIiwiX3R5cGUiLCJfaWQiLCJuYW1lIiwiaXNQcm9maWxlSW1hZ2VOZnQiLCJwcm9maWxlSW1hZ2UiLCJ3YWxsZXRBZGRyZXNzIiwiY3JlYXRlSWZOb3RFeGlzdHMiLCJlcnJvciIsImdldE5mdFByb2ZpbGVJbWFnZSIsImltYWdlVXJpIiwiaXNOZnQiLCJxdWVyeSIsInNhbml0eVJlc3BvbnNlIiwiZmV0Y2giLCJmb3JFYWNoIiwiaXRlbSIsInByb2ZpbGVJbWFnZVVybCIsImF1dGhvciIsIm5ld0l0ZW0iLCJ0d2VldCIsInRpbWVzdGFtcCIsInByZXZTdGF0ZSIsInVzZXJBY2NvdW50IiwicmVzcG9uc2UiLCJwcm9maWxlSW1hZ2VVcmkiLCJjb3ZlckltYWdlIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/TwitterContext.js\n");

/***/ }),

/***/ "./library/client.js":
/*!***************************!*\
  !*** ./library/client.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"client\": () => (/* binding */ client)\n/* harmony export */ });\n/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/client */ \"@sanity/client\");\n/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst client = _sanity_client__WEBPACK_IMPORTED_MODULE_0___default()({\n    projectId: '4wiagbme',\n    dataset: 'production',\n    apiVersion: 'v1',\n    token: 'skocb3I60blZh0i4DzXy8TCvCAgVHOmDTJmenzmsxWFyS3m46bjmjXD5WntSdcFebmLE64LLfibFdhAAMKutEKnlrOXKgqmvOFgnYxgvdMLO3U3JJzvy9Mq42BYZYUTh3fMEOPnImPtp1dipPoet6UV02bcpohxez8U00JwkhKp2rHl3JiKv',\n    useCdn: false\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWJyYXJ5L2NsaWVudC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBeUM7QUFFbEMsS0FBSyxDQUFDQyxNQUFNLEdBQUdELHFEQUFZLENBQUMsQ0FBQztJQUNsQ0UsU0FBUyxFQUFFLENBQVU7SUFDckJDLE9BQU8sRUFBRSxDQUFZO0lBQ3JCQyxVQUFVLEVBQUUsQ0FBSTtJQUNoQkMsS0FBSyxFQUFFLENBQXNMO0lBQzdMQyxNQUFNLEVBQUUsS0FBSztBQUNmLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJyYXJ5L2NsaWVudC5qcz8wYTQ0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzYW5pdHlDbGllbnQgZnJvbSAnQHNhbml0eS9jbGllbnQnXG5cbmV4cG9ydCBjb25zdCBjbGllbnQgPSBzYW5pdHlDbGllbnQoe1xuICBwcm9qZWN0SWQ6ICc0d2lhZ2JtZScsXG4gIGRhdGFzZXQ6ICdwcm9kdWN0aW9uJyxcbiAgYXBpVmVyc2lvbjogJ3YxJyxcbiAgdG9rZW46ICdza29jYjNJNjBibFpoMGk0RHpYeThUQ3ZDQWdWSE9tRFRKbWVuem1zeFdGeVMzbTQ2YmptalhENVdudFNkY0ZlYm1MRTY0TExmaWJGZGhBQU1LdXRFS25sck9YS2dxbXZPRmduWXhndmRNTE8zVTNKSnp2eTlNcTQyQllaWVVUaDNmTUVPUG5JbVB0cDFkaXBQb2V0NlVWMDJiY3BvaHhlejhVMDBKd2toS3AyckhsM0ppS3YnLFxuICB1c2VDZG46IGZhbHNlLFxufSkiXSwibmFtZXMiOlsic2FuaXR5Q2xpZW50IiwiY2xpZW50IiwicHJvamVjdElkIiwiZGF0YXNldCIsImFwaVZlcnNpb24iLCJ0b2tlbiIsInVzZUNkbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./library/client.js\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_TwitterContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/TwitterContext */ \"./context/TwitterContext.js\");\n/* harmony import */ var _library_hexagonStyling_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../library/hexagonStyling.css */ \"./library/hexagonStyling.css\");\n/* harmony import */ var _library_hexagonStyling_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_library_hexagonStyling_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_TwitterContext__WEBPACK_IMPORTED_MODULE_2__.TwitterProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/Himanshu/Documents/twitter-blockchain-app/client/pages/_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/Himanshu/Documents/twitter-blockchain-app/client/pages/_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEI7QUFFNkI7QUFDckI7U0FFN0JDLEtBQUssQ0FBQyxDQUFDLENBQUNDLFNBQVMsR0FBRUMsU0FBUyxFQUFXLENBQUMsRUFBRSxDQUFDO0lBQ2xELE1BQU0sNkVBQ0hILG9FQUFlOzhGQUNiRSxTQUFTO2VBQUtDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCLENBQUM7QUFFRCxpRUFBZUYsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnXG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnXG5pbXBvcnQgeyBUd2l0dGVyUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L1R3aXR0ZXJDb250ZXh0J1xuaW1wb3J0ICcuLi9saWJyYXJ5L2hleGFnb25TdHlsaW5nLmNzcydcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxUd2l0dGVyUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Ud2l0dGVyUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHAiXSwibmFtZXMiOlsiVHdpdHRlclByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./library/hexagonStyling.css":
/*!************************************!*\
  !*** ./library/hexagonStyling.css ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@sanity/client":
/*!*********************************!*\
  !*** external "@sanity/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sanity/client");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();