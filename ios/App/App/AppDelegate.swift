import UIKit
import Capacitor
// import Appboy_iOS_SDK
// import UserNotifications
import FirebaseCore
import FirebaseInstanceID
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
		// if #available(iOS 10, *) {
		// 	let center = UNUserNotificationCenter.current()
		// 	center.delegate = self as? UNUserNotificationCenterDelegate
		// 	var options: UNAuthorizationOptions = [.alert, .sound, .badge]
		// 	if #available(iOS 12.0, *) {
		// 		options = UNAuthorizationOptions(rawValue: options.rawValue | UNAuthorizationOptions.provisional.rawValue)
		// 	}
		// 	center.requestAuthorization(options: options) { (granted, error) in
		// 		Appboy.sharedInstance()?.pushAuthorization(fromUserNotificationCenter: granted)
		// 	}
		// 	UIApplication.shared.registerForRemoteNotifications()
		// } else {
		// 	let types : UIUserNotificationType = [.alert, .badge, .sound]
		// 	let setting : UIUserNotificationSettings = UIUserNotificationSettings(types:types, categories:nil)
		// 	UIApplication.shared.registerUserNotificationSettings(setting)
		// 	UIApplication.shared.registerForRemoteNotifications()
		// }
        FirebaseApp.configure()
        return true
      }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken

        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
      NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

	// func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any],
    // 	fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void){
	// 		Appboy.sharedInstance()?.register(application,
    //                                         didReceiveRemoteNotification: userInfo,
    //                                         fetchCompletionHandler: completionHandler)
	// 	}

	// func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data){
	// 	Appboy.sharedInstance()?.registerDeviceToken(deviceToken)
	// }

	// func userNotificationCenter(_ center: UNUserNotificationCenter,didReceive response: UNNotificationResponse,
    // 	withCompletionHandler completionHandler: @escaping () -> Void) {
	// 		Appboy.sharedInstance()?.userNotificationCenter(center,
    //                                            didReceive: response,
    //                                            withCompletionHandler: completionHandler)
	// 	}

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesBegan(touches, with: event)

        let statusBarRect = UIApplication.shared.statusBarFrame
        guard let touchPoint = event?.allTouches?.first?.location(in: self.window) else { return }

        if statusBarRect.contains(touchPoint) {
            NotificationCenter.default.post(name: .capacitorStatusBarTapped, object: nil)
        }
    }

}
