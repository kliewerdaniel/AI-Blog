#!/bin/bash

# This script simulates the Netlify build process locally to test if the fixes work

echo "Creating static/input_images directory..."
mkdir -p static/input_images

echo "Copying image files from input_images directories..."
cp -r input_images01/* static/input_images/ || true
cp -r input_images02/* static/input_images/ || true
cp -r input_images03/* static/input_images/ || true
cp -r input_images04/* static/input_images/ || true

echo "Creating empty placeholder files for problematic symlinks..."
touch static/input_images/B01N78T9F901_SCLZZZZZZZ_SX500_.jpg
touch static/input_images/B0BHLH14NQ01_SCLZZZZZZZ_SX500_.jpg
touch static/input_images/B0BW23BXYN01S001LXXXXXXX.jpg
touch static/input_images/books-003.JPG
touch static/input_images/books-005.JPG
touch static/input_images/books-007.JPG
touch static/input_images/books-013.JPG
touch static/input_images/books-015.JPG
touch static/input_images/books

echo "Creating empty placeholder files for all dangling symlinks found in the build logs..."
touch static/input_images/130188528_3781238605303881_7510459135709865265_n.jpg
touch static/input_images/144327630_3930950650332675_7163600755928566265_n.jpg
touch static/input_images/161777802_4047093135385092_472397087862373077_n.jpg
touch static/input_images/20221010_111253.jpg
touch static/input_images/20221010_145455.jpg
touch static/input_images/20221011_005157.jpg
touch static/input_images/20221012_105602.jpg
touch static/input_images/20221012_145451.jpg
touch static/input_images/20221013_125636.jpg
touch static/input_images/20221013_133924.jpg
touch static/input_images/20221013_134808.jpg
touch static/input_images/20221013_134815.jpg
touch static/input_images/20221013_140515.jpg
touch static/input_images/20221013_140630.jpg
touch static/input_images/20221013_140920.jpg
touch static/input_images/20221013_144240.jpg
touch static/input_images/20221013_144257.jpg
touch static/input_images/20221013_144305.jpg
touch static/input_images/20221013_170405.jpg
touch static/input_images/20221013_172115.jpg
touch static/input_images/20221013_174915.jpg
touch static/input_images/20221014_111722.jpg
touch static/input_images/20221014_124553.jpg
touch static/input_images/20221014_134512.jpg
touch static/input_images/20221014_153920.jpg
touch static/input_images/20221112_132825.jpg
touch static/input_images/20221113_153653.jpg
touch static/input_images/20221113_161248.jpg
touch static/input_images/20221113_161512.jpg
touch static/input_images/20221113_161526.jpg
touch static/input_images/20221113_161531.jpg
touch static/input_images/20221113_161540.jpg
touch static/input_images/20221113_161556.jpg
touch static/input_images/20221113_162250.jpg
touch static/input_images/20221113_162309.jpg
touch static/input_images/289641143_5461602423934149_1613512193125880228_n.jpg
touch static/input_images/314598570_5848149695279418_2663164436116368473_n.jpg
touch static/input_images/319815256_5961632573931129_6407827479216061436_.jpg
touch static/input_images/326218428_5882108565159414_5579593452106029515_n.jpg
touch static/input_images/38524618_2014124792015280_5352241592616878080_n.jpg
touch static/input_images/463314582_8751461421614883_6093502764820900015_n.jpg
touch static/input_images/463430190_8751461418281550_7714871349040429364_n.jpg
touch static/input_images/463437008_8751402828287409_6880135836708144342_n.jpg
touch static/input_images/463751864_8751403184954040_8729498268726413009_n.jpg
touch static/input_images/463784634_8751402834954075_5802434536383396028_n.jpg
touch static/input_images/463893960_8751402418287450_1246655841173803972_n.jpg
touch static/input_images/474775887_490715300428480_2081408431757738514_n.jpg
touch static/input_images/475838291_1316583769763327_611859964883411367_n.jpg
touch static/input_images/476485484_1684131429201363_7550930141077594240_n.jpg
touch static/input_images/476485520_618748147579301_2628358660310613573_n.jpg
touch static/input_images/476485893_1141800154331157_7662562200996339651_n.jpg
touch static/input_images/476902298_2026199734459132_8101314172205332991_n.jpg
touch static/input_images/477085949_1376430796875724_8916528934155297778_n.jpg
touch static/input_images/477493740_596522203209143_8128024935578485345_n.jpg
touch static/input_images/69941916-CF12-4AAE-8ABE-86BED96E8795.jpg
touch static/input_images/77082571-3717-4590-9131-5212AB1ACCAA.jpg
touch static/input_images/B01N78T9F9.01._SCLZZZZZZZ_SX500_.jpg
touch static/input_images/B0BHLH14NQ.01._SCLZZZZZZZ_SX500_.jpg
touch static/input_images/B0BW23BXYN.01.S001.LXXXXXXX.jpg
touch static/input_images/B2B11E10-05AD-4951-ADE3-917B92D36250.jpg
touch static/input_images/B9B57FFB-2251-44C5-8215-3DDD17162E1F.jpg
touch static/input_images/bridge.jpg
touch static/input_images/C8C6DEF8-4239-4B16-ADF3-4EAF62D4795A.jpg
touch static/input_images/captain.jpg

echo "Running Jekyll build..."
JEKYLL_ENV=production bundle exec jekyll build

echo "Build completed. Check for any errors above."
