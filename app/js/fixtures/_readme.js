// 如果需要假資料供開發用，放這裏

/*jshint maxlen:200 */
// 這是為了建立假資料，方便程式能跑起來，跟測試無關
(function () {
  'use strict';

  App.Fixtures || (App.Fixtures = {});

  App.Fixtures.Notes = [
    {
      "createdAt": Date.UTC(2013, 1, 23, 0, 0, 0),
      "text": "## Recreation\n* Seattle Bouldering Project\n* Burke-Gilman Trail\n* Ballard Locks\n\n## Dining\n* Pies and Pints\n* Señor Moose's\n* Delancey\n* Dahlia Lounge",
      "title": "Things to do in Seattle."
    },
    {
      "createdAt": Date.UTC(2013, 1, 23, 0, 0, 1),
      "text": "## Sights\n* Tidal Basin\n* National Mall\n* Rock Creek Trail\n\n## Cultural\n* National Portrait Gallery\n* National Gallery of Art\n* Hirshhorn Museum\n* The Phillips Collection",
      "title": "Things to do in Washington, DC."
    },
    {
      "createdAt": Date.UTC(2013, 1, 23, 0, 0, 2),
      "text": "## Europe\n* Scotland\n* Ireland\n\n## South America\n* Patagonia\n* Peru",
      "title": "Places I want to go."
    }
  ];

}());
