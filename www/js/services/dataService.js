// This service stores the hard-coded pin data for demonstration mode
angular.module('starter.services')
.service('dataService', [dataService]);

// Sample pin data
var pins = [
    {
        id: 1,
        pin_title: 'Free golf clubs',
        pin_description: 'Missing the nine iron.',
        pin_image: '../images/uploads/golfclubs.jpg',
        latitude: '39.748790279',
        longitude: '-104.979772568',
        active: true,
        missing: false,
        picked_up: false,
        dropper_id: 1,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null,
        dropper: 'cool_eskimo_guy',
        receiver: 'PersianPrince86',
        drop_time: "12 hours ago",
        pick_up_time: "1 hour ago"

      },
    {
        id: 2,
        pin_title: 'Free bookshelf',
        pin_description: 'Out back in the alley',
        pin_image: '../images/uploads/bookshelf.jpg',
        latitude: '39.732372967',
        longitude: '-104.979772568',
        active: true,
        missing: false,
        picked_up: false,
        dropper_id: 2,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null,
        dropper: 'soccer_steve',
        receiver: 'biggestdoglover',
        drop_time: "1 day ago",
        pick_up_time: "3 hours ago"
      },
    {
        id: 3,
        pin_title: 'Where\'s Waldo?',
        pin_description: 'Can you find him?',
        pin_image: '../images/uploads/waldo.jpg',
        latitude: '39.745408137',
        longitude: '-105.045948029',
        active: true,
        missing: false,
        picked_up: true,
        dropper_id: 5,
        receiver_id: 3,
        receiver_message: 'Found him! What a cutie!',
        receiver_image: '../images/uploads/waldo_found.jpg',
        dropper: 'gemini_gal',
        receiver: 'speed42racer',
        drop_time: "3 hours ago",
        pick_up_time: "45 minutes ago"
      },
    {   id: 4,
        pin_title: 'Scooby',
        pin_description: 'Scooby Doo, where are you?',
        pin_image: '../images/uploads/scooby.jpg',
        latitude: '39.741404',
        longitude: '-105.002103',
        active: true,
        missing: false,
        picked_up: true,
        dropper_id: 5,
        receiver_id: 4,
        receiver_message: 'Thank you! This helps so much!',
        receiver_image: '../images/uploads/scooby_found.jpg',
        dropper: 'gavin0guitar',
        receiver: 'i_need_a_name',
        drop_time: "8 hours ago",
        pick_up_time: "7 hours ago"
      },
    {
        id: 5,
        pin_title: 'Bunnies!',
        pin_description: 'Scavenger hunt at City Park! All bunnies have $$$ inside!',
        pin_image: '../images/uploads/bunnies.jpg',
        latitude: '39.746068080',
        longitude: '-104.953680038',
        active: true,
        missing: false,
        picked_up: false,
        dropper_id: 2,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null,
        dropper: 'king_arthur',
        receiver: null,
        drop_time: "3 hours ago",
        pick_up_time: null
    },
    {
        id: 6,
        pin_title: 'Портфель',
        pin_description: 'Это пакет, который вы просили, владимир',
        pin_image: '../images/uploads/briefcase.jpg',
        latitude: '39.723758501',
        longitude: '-105.004706383',
        active: true,
        missing: true,
        picked_up: false,
        dropper_id: 3,
        receiver_id: null,
        receiver_message: null,
        receiver_image: null,
        dropper: 'Vladimer',
        receiver: 'silent_admirer',
        drop_time: "3 days ago",
        missing_time: "1 day ago"
    }];

function dataService () {
  return {
    getPins: function () {
      return pins;
    },
    getPin: function (id) {
      var pin;
      for (var i = 0; i < pins.length; i++) {
        if (pins[i].id === Number(id)) {
          return pins[i];
        }
      }
    },
    newPin: function (pin) {
      pin.id = pins.length + 1;
      pins.push(pin);
    },
    editPin: function (pin) {
      pins[pin.id-1] = pin;
    },
    getDropsByUser: function (user_id){
      var array = [];
      pins.forEach(function(pin) {
        if (pin.dropper_id === user_id)
          array.push(pin);
      });
      return array;
    },
    getPickupsByUser: function (user_id){
      var array = [];
      pins.forEach(function(pin) {
        if (pin.receiver_id === user_id)
          array.push(pin);
      });
      return array;
    },

  };
}
