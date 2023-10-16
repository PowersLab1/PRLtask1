// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.PostMessage",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "ACH - Negative",
    "description": "",
    "repository": "https:\u002F\u002Fgithub.com\u002FDorisc2\u002FACH.git",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 688.44,
          "height": 78.11,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "You will be seeing a series of photos, \nplease pay attention to them all the way through.",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Intro",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": -25,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"1111.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "1650.jpg": "embedded\u002F6dfa8c8912103c0b48cd8232eefc3f0dae29c8be7c5ea399992e698c1c76ec4b.jpg",
        "1111.jpg": "embedded\u002Fe90d1651f08c8cba058437b4faa750caf8304210e916565fe91158e7bf32c9d8.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "1",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 50,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"1220.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "1660.jpg": "embedded\u002F01f32e12480c12ba78818101eea3461cd9f8026fdf8d7d700fd9e62a65b2dcdc.jpg",
        "1220.jpg": "embedded\u002F6104f3d334c773d0f6894bb6e40cea739467341f95a892ac8b02c66b70ca1179.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "2",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"1270.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "1810.jpg": "embedded\u002F7f0de4f47b9b91c02ca872a26bb9a42e7a74b916cdae3746bdfd3b0a8e583a4c.jpg",
        "1270.jpg": "embedded\u002Fb633287e3b3fe7e78a4f85e7c724e18f94d51df012bb3c533b74dc8f8ffd1ecd.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "3",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 85,
          "top": -25,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"1275.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "2510.jpg": "embedded\u002F6c277429dd3e382a3d0693cc9b6936ead913fd9060baa8a54b464be068c03dca.jpg",
        "1275.jpg": "embedded\u002F41ae8cf1aed2d53f11860f05e0dd9948e3fa6f6d5f5e9380ee148555c0c13619.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "4",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": -111,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"2039.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "2900.2.jpg": "embedded\u002F078f2c39472f4a8bba1551263a2a9bceff7b86d7f93db889a2aa1b57bfcbae69.jpg",
        "2039.jpg": "embedded\u002F0f8932ea55c2907681be29060df1b03d45d52fc7821a92f4f7ef2bc11b1c971f.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "5",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"2110.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "4598.jpg": "embedded\u002Fd121f4f278b582bb70d0ebb0948cdb1f3ca1c60de4ab4bc7d4460b7d2f15ad34.jpg",
        "2110.jpg": "embedded\u002F85a6c2824fcaf49822096c0825583d4d19e7648231447822edd1be75fc204d30.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "6",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"2456.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "4600.jpg": "embedded\u002Fe2396ba0d0e83845c4d61e2928aaf0d6b8059f2277d3fe070466c3fa323c2f37.jpg",
        "2456.jpg": "embedded\u002Fad29a5c455fd92cbaf8538687a4767b39d9f8440277addf606f448e46b844c0d.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "7",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": -50,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"2900.1.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "4612.jpg": "embedded\u002F84816e43b705ad6c66e8b207edcdb9a7407ed082bf2323dc84b5d7bcdc69b57c.jpg",
        "2900.1.jpg": "embedded\u002Ffcb32f233ae0577f7ba1b09247b646965a6e62bc883c735223889b62635617e4.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "8",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": -61,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"6840.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "4700.jpg": "embedded\u002F2fd950148c986d5fefd625988ec6ca33b9393ad8de901e58877c020444044637.jpg",
        "6840.jpg": "embedded\u002Fbd35ac5e71518e75eb1124b12b42dd4bed88595176fa093c6634c7e525b68df2.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "9",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"7078.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5270.jpg": "embedded\u002F52b6a22fa64bfd6fb11f1a8cb76cd4e2ca25a2a44b798dcca3bf2cf30746e05f.jpg",
        "7078.jpg": "embedded\u002Fd06a64e6b003bb4295afe17ce6a60d969d1256efee2fd822ee35d551e3dbbdb4.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "10",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 50,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9002.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5300.jpg": "embedded\u002Fe4d374ed051eeb11ed1bac080ca40db8a932cfaa57f58b2d52b73f0116a5ce4a.jpg",
        "9002.jpg": "embedded\u002F3d71f13d9a89b9b75368190936140268b918ad792ad197ac32b5ea3475189508.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "11",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9010.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5301.jpg": "embedded\u002Fe29eb6c61ce1cc1f08ef0ec6dafd450d0a8c0ac2e852267682fe3cbe8cdd4f84.jpg",
        "9010.jpg": "embedded\u002F49220aa6f870e41ff5093360379f0fd42725a9d746f4bd6ae1c8efb1a663c0a4.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "12",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": -25,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9031.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5600.jpg": "embedded\u002F641bc1af99664d0123674600d536ce457e205e4df7aa33b98b8bec11a3be101a.jpg",
        "9031.jpg": "embedded\u002F6f12ccda9c58b00f73ed1a51d5fc0c395cf0fa4c651413f839c3236bfe7e36bb.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "13",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": -86,
          "top": 10,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9090.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5660.jpg": "embedded\u002F8998e613eb7f845b84db0771676b9e3f4fc07d27e14ea4323c781b30cecdb1ab.jpg",
        "9090.jpg": "embedded\u002F6e3d570c287593dff171c23e359dfb6fa063234b33fa63a091e2b807a10bdbd0.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "14",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9110.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5725.jpg": "embedded\u002F7e3f11cea7e700b0550a3e3dc1241523d0484c159221fb02c35e56f71aa31945.jpg",
        "9110.jpg": "embedded\u002Fd5c739400cc1c595f1e77a7bb0929d0c89e1cc5d13c18f0d68aba4c161ab1086.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "15",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9320.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5870.jpg": "embedded\u002F1cef6084e58dd541425267bce0879bd5d768f6bfaaf0199dd87c7bc35028efba.jpg",
        "9320.jpg": "embedded\u002Ff649ced2ec58b71da76eeaa6c2f3ba13754a7a3ff467397df324c44b11656b02.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "16",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9331.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5890.jpg": "embedded\u002F924c3678432cebe001fc7c532b558787dfd5c4f2c8331a15a27931ac44835a29.jpg",
        "9331.jpg": "embedded\u002Fc6dd00e24da0b70ecca076b4b79614e5c1eedf63ac593ef5f831f4e2005e41de.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "17",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9373.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5891.jpg": "embedded\u002F2952d9d43072545d69302b90ed3e0e48359afd94d2908c42602e6fe5a44634cc.jpg",
        "9373.jpg": "embedded\u002Fd983fefec99be5ba49eae45756ff76ec0d9f40c998b8082ce58e2acd63141493.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "18",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9560.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5982.jpg": "embedded\u002F6b432b11271fed7b981e45924fb9aaeea340ea480b7cef630ee0baa670fd603c.jpg",
        "9560.jpg": "embedded\u002F3e6895cd9bc16ce883db5bfe999f555a79cf4888c52903ac51a1115695170e34.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "19",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9561.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "5991.jpg": "embedded\u002F44744951373de5c592886b3470d46ca2464c1f5d3d812774b9b24ce457cfb109.jpg",
        "9561.jpg": "embedded\u002Fc12f599f57382cf4400dc5bbe24725dd32299cfb1e0a3bdfacc6c152c9414c90.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "20",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 0,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9800.jpg\"] }"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "7499.jpg": "embedded\u002F13da26d012b4a6a48f7942e299233e64f9c4d0e8305de50887e4905443e4eb7c.jpg",
        "9800.jpg": "embedded\u002F64fcb3de8b4267d9d82861b91705fcdcabe9130ffe9c933c069d5886de43b59b.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "21",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 50,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9831.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "7515.jpg": "embedded\u002F1597fa33afd90634e206a354674e42365f7134855c31b4121aaa65bd337d0718.jpg",
        "9831.jpg": "embedded\u002Fc8fc343a112ff1d9dd8b1759238e5bcaee004636cf9c3f0327c7b65e46c1ce3d.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "22",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": 0,
          "top": 50,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9832.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "7580.jpg": "embedded\u002Fc49eaf0747460356b4e7a398a15499d8452884551e515e6b359222eddd3dd1b4.jpg",
        "9832.jpg": "embedded\u002Fadf4f103920e90d735db93d463d54726cdfdda4ceba4d4797ea1edf152ce221c.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "23",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "left": -25,
          "top": 50,
          "angle": 0,
          "width": 1024,
          "height": 768,
          "stroke": null,
          "strokeWidth": 0,
          "fill": "black",
          "src": "${ this.files[\"9912.jpg\"] }",
          "autoScale": undefined
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "8130.jpg": "embedded\u002Fd183a7e6e436eea06206ffd8b4d5ddd6f4a858d0154f5ef7c74c6ae753c83dce.jpg",
        "9912.jpg": "embedded\u002Fc3012bf6286d286d9cc35d34fcb3095ff8872ac783007e042d27ecd081469df5.jpg"
      },
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "24",
      "timeout": "3000"
    },
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "left": 0,
          "top": -12,
          "angle": 0,
          "width": 578.14,
          "height": 36.16,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "Press Spacebar to indicate you are done",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        },
        {
          "type": "i-text",
          "left": 0,
          "top": -86,
          "angle": 0,
          "width": 67.56,
          "height": 36.16,
          "stroke": null,
          "strokeWidth": 1,
          "fill": "black",
          "text": "END",
          "fontStyle": "normal",
          "fontWeight": "normal",
          "fontSize": 32,
          "fontFamily": "sans-serif",
          "lineHeight": 1.16,
          "textAlign": "center"
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {},
      "responses": {
        "keypress": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "End"
    }
  ]
})

// Let's go!
study.run()