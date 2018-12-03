# Build Instructions - Swirl - Dec, 3, 2018
Commit a2699a5c602ef552a19b41ef4de4eafdfb23453c

    git clone https://gitlab.com/swirl_app/swirl-mobile-app.git
    cd swirl-mobile-app/
    npm install
    react-native link

    cd node_modules/react-native
    sh scripts/ios-install-third-party.sh
    
    cd third-party/glog-0.3.4
    ./configure
    make
    make install


Open Xcode project in:
`swirl-mobile-app/ios/Swirl.xcodeproj`

Remove and then replace libfishhook.a as shown below.
![replace libfishhook.a in XCode](https://user-images.githubusercontent.com/2400215/45737941-92981200-bc08-11e8-80fc-978147db7a9a.png)

If you'd like to see the original threads for context, refer to the following:

* https://github.com/facebook/react-native/issues/14382
  Thread pertaining to the `third-party` issue.
* https://github.com/facebook/react-native/issues/19569
  Thread pertaining to the `libfishhook.a` issue.

## Update
You also need to go in a change a line in a node_module file to prevent gifs
from looping for the app entry animation.

From the top directory of the project:
    cd node_modules/react-native/Libraries/Image
    
Open `RCTGIFImageDecoder.m` and change: `animation.repeatCount = loopCount == 0 ? HUGE_VALF : loopCount;`

to: `animation.repeatCount = loopCount == 0 ? 0 : loopCount;`