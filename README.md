# base emoji

You have base 16, base 64, and now, base emoji.

(Output a buffer in emojis.)

## example

`0x000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfeff`

becomes

:100::1234::+1::-1::8ball::a::aerial_tramway::airplane::alien::ambulance::anchor::angel::anger::angry::ant::apple::arrow_down::arrow_left::arrow_right::arrow_up::art::atm::baby::baby_bottle::balloon::bamboo::banana::bangbang::bar_chart::barber::basketball::bath::battery::bear::bee::beer::beetle::bell::bicyclist::bikini::birthday::black_joker::blossom::blue_book::blue_car::blue_heart::boar::boat::bomb::book::books::boom::boot::bouquet::bowling::boy::bread::bride_with_veil::briefcase::broken_heart::bug::bulb::bus::bust_in_silhouette::cactus::cake::calendar::camel::candy::car::cat2::cd::checkered_flag::cherries::chicken::chocolate_bar::christmas_tree::clap::clapper::cloud::cocktail::coffee::computer::confetti_ball::construction::cookie::corn::couple::cow2::crocodile::crown::crystal_ball::cupid::cyclone::dancer::dart::dash::deciduous_tree::dizzy::dog2::dollar::dolphin::doughnut::door::droplet::ear::earth_africa::eyeglasses::facepunch::feet::fire::flashlight::floppy_disk::football::four_leaf_clover::fried_shrimp::fries::frog::game_die::gem::ghost::gift::globe_with_meridians::golf::grapes::green_apple::guitar::gun::hamburger::hammer::handbag::hatching_chick::herb::high_brightness::high_heel::horse::hourglass::ice_cream::jack_o_lantern::key::kiss::koala::leaves::link::lock::loudspeaker::mag::mailbox::maple_leaf::mega::memo::microphone::microscope::moneybag::monkey::moon::mouse2::movie_camera::muscle::mushroom::musical_keyboard::musical_note::necktie::newspaper::no_bell::no_entry::no_entry_sign::nose::nut_and_bolt::octopus::ok_hand::open_hands::ox::panda_face::partly_sunny::paw_prints::peach::pear::penguin::performing_arts::phone::pig2::pig_nose::pill::pineapple::pizza::point_down::point_left::point_right::point_up_2::police_car::poodle::poop::postal_horn::poultry_leg::pray::purse::pushpin::rabbit2::racehorse::radio::rat::ribbon::rice::ring::rocket::rooster::rose::rotating_light::round_pushpin::runner::santa::satellite::saxophone::scissors::shell::shirt::shower::skull::smile::snail::snake::snowflake::snowman::sob::soccer::sound::space_invader::speech_balloon::star::strawberry::sunglasses::sweat_drops::swimmer::syringe::telescope::tennis::thought_balloon::toilet::tongue::tophat::traffic_light::trophy::trumpet::turtle::vertical_traffic_light::vhs::video_game::violin::watch::whale2::wine_glass::wolf::wrench::zap::zzz:


## api

```js
var baseEmoji = require('base-emoji')
var buf = new Buffer('deadbeef', 'hex')
baseEmoji.toUnicode(buf)
// => '❄🐼🚓👅'
baseEmoji.toNames(buf)
// => ':snowflake::panda_face::police_car::tongue:'
baseEmoji.toCustom(buf, function(v, emoji) {
  return '<img src="/img/emoji/'+emoji.name+'.png" alt="'+emoji.char+'" title="'+emoji.name+'">'
})
// => '<img src="/img/emoji/snowflake.png" alt="❄" title="snowflake">...'
baseEmoji.fromUnicode(baseEmoji.toUnicode(buf))
// => <Buffer de ad be ef>
```

## encoding

The emojis used are in `emojis.json`. There are 843 emojis there, but the converter reads sequences of 8 bits at a time, and so only maps the value to the first 256 of them. To stay consistent with other renderings, make sure you don't change the order of your emojis.json.
