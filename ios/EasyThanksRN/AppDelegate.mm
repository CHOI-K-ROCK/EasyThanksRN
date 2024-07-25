#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

// kakao
#import <RNKakaoLogins.h>
// naver
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
// google
#import <GoogleSignIn/GoogleSignIn.h>
#import <Firebase.h>

// splash
#import "RNSplashScreen.h" 

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.moduleName = @"EasyThanksRN";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  if ([FIRApp defaultApp] == nil){
    [FIRApp configure];
  }

  // splash https://github.com/crazycodeboy/react-native-splash-screen/issues/606#issuecomment-1401875339
  bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions];
  
  [RNSplashScreen show];
  
  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  return [self bundleURL];
}

- (NSURL *)bundleURL {
#if DEBUG
  return
      [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main"
                                 withExtension:@"jsbundle"];
#endif
}

// oauth
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:
                (NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {

  // kakao
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl:url];
  }

  //naver
  if ([url.scheme isEqualToString:@"com.rockwithsun.easythanks"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance]
        application:app
            openURL:url
            options:options];
  }
  
  return NO;
}

@end
