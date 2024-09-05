# `Aora [ React-Native & Expo ] App 📸`

Aora, React-Native ve Expo ile geliştirilmiş bir mobil video oluşturma ve paylaşım uygulamasıdır.

### `Features 🥏`

-   Kullanıcı adı, email ve şifre ile kullanıcıların uygulamaya **signUp** olabilmesi özelliği,
-   Kayıtlı kullanıcıların, email ve şifreleri aracılığıyla uygulamaya **signIn** yapabilmesi özelliği,
-   Kullanıcıların, kendi oluşturduğu veya diğer kullanıcılar tarafından oluşturulan videoları görebilmesi özelliği,
-   Kullanıcıların bir video, thumbnail, video title ve Ai prompt ile ( video boyutu 50mb'dan büyük olmayacak şekilde ) yeni bir video oluşturabilmesi özelliği için bir create sekmesi,
-   Kullanıcının uygulamadan güvenli bir şekilde çıkış yapabilmesi ve daha önce oluşturduğu tüm videoları görebilmesi için bir profile sekmesi,
-   Anasayfada diğer kullanıcıların videoları içerisinden belirli bir başlığa göre video araması yapabilmesi ve filtreleyebilmesi özelliği,
-   Kullanıcının kendi oluşturduğu videoları veya diğer kullanıcıların oluşturduğu videolara bookmark ekleyip daha sonra tamamına erişebileceği bir bookmark sekmesi,
-   Kullanıcının bookmark'a eklediği videoların içerisinde arama ve filtreleme yapabilmesi özelliği,
    gibi özellikleri bünyesinde barındırır.

### `Tech Stack 📚`

-   **react-native-picker** ▶ Video yükleme aşamasında video | thumbnail seçiminde spesifik yönlendirme için.
-   **expo-av** ▶ Yüklenmiş videoların gösterilmesi için.
-   **expo-constants** ▶ Enviroment variables oluşturabilmek ve uygulama veritabanı güvenliği için.
-   **expo-router** ▶ File Based routing için.
-   **react-native-appwrite** ▶ Uygulamanın appwrite database ile bağlantısının kurulması için.
-   **react-native-safe-area-context** ▶ Uygulama arayüzü oluşturulmasında güvenli gösterim için.
-   **react-native-webview** ▶ Video içeriği youtube - vimeo gibi platformlardan gelen videoların sorunsuz gösterilebilmesi için.
-   **Typescript** ▶ Güvenli geliştirme ortamı ve tip doğrulaması için.
-   **react-native-reanimated** ▶ Uygulama içi geçiş ve etkileşim animasyonları için.

### `React-Native & Expo Educational Notes 📝`

-   React-Native **IOS ve Android** için tek bir codebase ile geliştirme yapmamızı sağlar. Böylece geliştirme süreleri ve maliyet büyük ölçüde azalır.
-   React-Native'in çok popüler olmasının ana sebeplerinden birisi **Native components** kullanımına izin vermesidir. **Native components** daha iyi performansa sahip ve daha kusursuz kullanıcı arayüzlü uygulamalar oluşturulmasına olanak verir.
-   Büyük şirketler **( Meta, Discord, Microsoft, Tesla, Amazon, AirBNB Hatta Call of Duty )** React Native kullanıyorlar.
-   React-Native aynı zamanda **Hot Reloading** özelliği ile geliştirme sürecinin çok hızlı olmasını sağlıyor.
-   React-Native'in güçlü bir topluluk desteği bulunmakta ve her geçen gün de büyümekte. Aynı zamanda da öğrenmesi ve kullanması eğer **Javascript ve React** bilginiz bulunuyorsa çok daha kolay.
-   React-Native projesi oluşturmak için React'ta olduğu gibi Create-React-App, Vite gibi paketler yerine **Expo** kullanıyoruz. Expo React-Native geliştirme sürecini daha da kolaylaştıran bir paket. **Geliştirme değişkenleri** ve Native bağımlılıklar hakkında düşünmemize gerek kalmaz, **Android Studio** ve **xCode** gibi devasa geliştirme ortamlarını yüklememize gerek kalmaz.
-   Expo aynı zamanda pre-built componentler ve api'lar barındırır. (**Navigation, Gestures, Camera, Maps gibi**).
-   Expo Nextjs'de olduğu gibi **Expo Router** ismini verdiği **File Based** routing sağlar ve yakın süreçte RSC **( React-Server-Components )** özelliğini bünyelerine eklemeye odaklandılar.

### `Built-in Components`

-   **Text** componenti React'ta kullandığımız p veya h1 gibi tagler yerine kullanılır ve text görüntüler.
-   **View** componenti div kullanmaya benzer bir layout oluşturmak ve içerisine diğer component'leri eklemek için kullanılır. Default olarak flexbox yapısı kullanır.
-   **TouchableHighlight**, **TouchableOpacity** dokunmanın kullanıcıya ekranda bir dönüş yapmasını sağlar. Aynı zamanda da onPress prop'u ile bazı fonksiyonlar oluşturup kullanmamıza olanak verir.
-   **TouchableWithoutFeedback** dkunmanın kullanıcıya bir geri dönüşü olmaz. Genelde Linkler ve Resimler için kullanılır.
-   **ActivityIndicator** bir spinner yada loading indicator göstermemize olanak verir.
-   **FlatList** uzun listeler renderlamak ve scrollama gerektiğinde kullanılır. React'taki map fonksiyonuna benzer ve optimized scroll ve item seperation gibi extra özellikler sunar [ Uzun listeler ve smooth scrolling = Flatlist | Kısa listeler = map function ]
-   **ScrollView** içerisinde birden fazla component barındırabilen ve onlar için scroll edilebilir bir container sağlar. Oluşturulan sayfanın mevcut telefon ekranından daha uzun olması muhtemel durumlarda kullanılır.
-   **SafeAreaView** React'ta bir container'a 100dvh height vermek gibidir. Ekran boyutu ve ekranın yatay dikey olması gibi durumlar fark etmeksizin ekranın tamamını kaplamasını sağlar. Bu komponent yerine genelde react-native-safe-area-context kütüphanesini kullanmak daha doğru ve ekran yerleşimi daha güvenilirdir.
-   **Image** bir resim göstermemizi sağlar. source prop'u resim kaynağını, resizeMode resmin object-fit özelliğini ayarlar
-   **ImageBackground** bir background olarak resim göstermemizi sağlar.
-   **Modal** modallar oluşturmamızı ve göstermemizi sağlar.
-   **Alert.alert** tıklamalara bağlı modal olarak alert göstermemizi sağlar.
-   **Switch** switch componenti oluşturmamızı sağlar.
-   **StatusBar** telefonun status bar'ını görünür yada görünmez kılmak için kullanılabilir.

## Indirilmesi gereken paketler

-   👉 **npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar**
-   **npx expo start -c** projemizi çalıştırmak için gereken komuttur.
-   Sonrasında Setup etry point ayarlaması yapılmalıdır.
-   **app.json** dosyası projemiz için genel bir configuration dosyasıdır.
-   App folder'ı içerisinde (tabs) klasörü mobilde sekmeler oluşturmaya yarar. (tabs) içerisindeki **layout.tsx** bir navbar oluşturur Tabs içerisinde **Tabs.Screen**'ler yoluyla birden fazla sekme oluştururuz.
