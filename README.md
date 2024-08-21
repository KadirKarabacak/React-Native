<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

    ```bash
     npx expo start
    ```

In the output, you'll find options to open the app in a

-   [development build](https://docs.expo.dev/develop/development-builds/introduction/)
-   [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
-   [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
-   [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

-   [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
-   [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

-   [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
-   [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->

<!-- MY SECTION -->

# `React-Native`

-   React-Native olmadığı zamanlarda IOS ve Android için ayrı ayrı kod yazmamız gerekiyordu ve bu durum hem uzun süreçler hemde pahalı geliştirmeye sebebiyet veriyordu
-   React-Native ile beraber tek bir codebase yazarak hem IOS hem androidde çalışmasını sağlıyoruz.
-   React-Native'in ok popüler olmasının ana sebeplerinden birisi native components kullanmana izin veriyor. Bu da daha iyi performansa sahip ve daha kusursuz arayüzlü uygulamalar oluşturmamıza olanak veriyor.
-   Büyük şirketler ( Meta, Discord, Microsoft, Tesla, Amazon, AirBNB Hatta Call of Duty ) bile React Native kullanıyorlar.
-   React-Native aynı zamanda Hot Reloading özelliği ile geliştirme sürecinin çok hızlı olmasını sağlıyor.aaaaa
-   React-Native'in güçlü bir topluluk desteği bulunmakta ve her geçen gün de büyümekte. Aynı zamanda da öğrenmesi eğer Javascript ve React aşinalığınız varsa çok kolay.
-   React-Native projesi oluşturmak için React'ta olduğu gibi Create-React-App, Vite gibi paketler yerine **Expo** kullanıyoruz. Expo React-Native geliştirme sürecini daha da kolaylaştıran bir paket. Geliştirme değişkenleri ve Native bağımlılıklar hakkında düşünmemize gerek kalmaz, Android Studio ve xCode gibi devasa geliştirme ortamlarını yüklememize gerek kalmaz.
-   Expo aynı zamanda pre-built componentler ve api'lar barındırır. (**Navigation, Gestures, Camera, Maps gibi**).
-   Expo Nextjs'de olduğu gibi Expo Router ismini verdiği file-based routing sağlar ve yakın süreçte RSC (React-Server-Components) özelliğini bünyelerine eklemeye odaklandılar.

## Built-in Components

-   Text componenti React'ta kullandığımız p veya h1 gibi tagler yerine kullanılır ve text görüntüler.
-   View componenti div kullanmaya benzer bir layout oluşturmak ve içerisine diğer component'leri eklemek için kullanılır. Bazı prebuilt propları vardır, görünümü ve davranışı etkilerler. Default olarak flexbox kullanır.
-   TouchableHighlight dokunmanın kullanıcıya ekranda bir dönüş yapmasını sağlar.
-   TouchableWithoutFeedback dkunmanın kullanıcıya bir geri dönüşü olmaz. Genelde Linkler ve Resimler için kullanılır.
-   ActivityIndicator bir spinner yada loading indicator göstermemize olanak verir.
-   FlatList uzun listeler renderlamak ve scrollama gerektiğinde kullanılır. React'taki map fonksiyonuna benzer ve optimized scroll performansı ve item seperation gibi extra özellikler sunar [ Uzun listeler ve smooth scrolling = Flatlist | Kısa listeler = map function ]
-   ScrollView içerisinde birden fazla component barındırabilen ve onlar için scroll edilebilir bir contaier sağlar.
-   SafeAreaView React'ta bir container'a 100dvh height vermek gibidir. Ekran boyutu ve ekranın yatay dikey olması gibi durumlar fark etmeksizin ekranın tamamını kaplamasını sağlar. Bu komponent yerine genelde react-native-safe-area-context kütüphanesini kullanmak daha doğru ve ekran yerleşimi daha güvenilirdir.
-   Image, ImageBackground, Modal, Alert.alert, Switch, StatusBar

## Indirilmesi gereken paketler

-   👉 **npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar**
-   npx expo start -c projemizi çalıştırmak için gereken komuttur.
-   Sonrasında Setup etry point ayarlaması yapılmalıdır.
-   app.json dosyası projemiz için genel bir configuration dosyasıdır.
-   App folder'ı içerisinde (tabs) klasörü mobilde sekmeler oluşturmaya yarar. (tabs) içerisindeki \_layout.tsx bir navbar oluşturur Tabs içerisinde Tabs.Screen'ler yoluyla birden fazla sekme oluştururuz.
