# Build Instructions - Swirl - Nov, 21, 2018
Commit a509a444c101b776151df35672846acd210b3920

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