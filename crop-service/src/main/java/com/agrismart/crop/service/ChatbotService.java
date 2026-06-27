package com.agrismart.crop.service;

import com.agrismart.crop.dto.ChatbotRequest;
import com.agrismart.crop.dto.ChatbotResponse;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class ChatbotService {

    public ChatbotResponse getReply(ChatbotRequest request) {
        String msg = request.getMessage() != null ? request.getMessage().toLowerCase(Locale.ROOT) : "";
        String lang = request.getLanguage() != null ? request.getLanguage().toLowerCase(Locale.ROOT) : "en";

        String reply = "";

        if (lang.equals("hi")) {
            if (msg.contains("fertilizer") || msg.contains("npk") || msg.contains("urea") || msg.contains("fertiliser") || msg.contains("उर्वरक") || msg.contains("खाद")) {
                reply = "उर्वरक (NPK) का उपयोग फसल के चरण के अनुसार करें। धान के लिए: 120:60:60 N:P:K मानक है। यूरिया को तीन भागों में बांटकर डालें (रोपाई, कल्ले फूटते समय, और बालियां बनते समय)। मिट्टी परीक्षण के आधार पर ही संतुलित मात्रा तय करें।";
            } else if (msg.contains("weather") || msg.contains("rain") || msg.contains("forecast") || msg.contains("मौसम") || msg.contains("बारिश")) {
                reply = "हमेशा 3 दिनों के मौसम पूर्वानुमान की जांच करें। यदि भारी वर्षा (>5 मिमी) की संभावना हो, तो सिंचाई और कीटनाशक छिड़काव स्थगित कर दें ताकि रसायन बहने से बच सकें और पानी का भराव न हो।";
            } else if (msg.contains("yield") || msg.contains("harvest") || msg.contains("optimize") || msg.contains("पैदावार") || msg.contains("फसल")) {
                reply = "पैदावार बढ़ाने के लिए, प्रमाणित रोग-प्रतिरोधी बीजों (जैसे गेहूं के लिए HD-2967, धान के लिए CR-Dhan) का चयन करें और मिट्टी में सुधार के लिए हरी खाद या दालों के साथ फसल चक्र अपनाएं।";
            } else if (msg.contains("disease") || msg.contains("pest") || msg.contains("insect") || msg.contains("बीमारी") || msg.contains("कीड़ा")) {
                reply = "सामान्य बीमारियों में धान का झोंका रोग (Tricyclazole से उपचार) और गेहूं का गेरूआ रोग (Propiconazole से उपचार) शामिल हैं। जल निकासी अच्छी रखें और कीड़ों की रोकथाम के लिए नीम के तेल का छिड़काव करें।";
            } else {
                reply = "नमस्कार! मैं आपका एग्रीस्मार्ट एआई सहायक हूँ। मुझसे फसल चयन, उर्वरक (NPK) की मात्रा, मौसम की चेतावनी या पैदावार बढ़ाने के बारे में पूछें।";
            }
        } else if (lang.equals("pb")) {
            if (msg.contains("fertilizer") || msg.contains("npk") || msg.contains("urea") || msg.contains("fertiliser") || msg.contains("ਖਾਦ")) {
                reply = "ਖਾਦ (NPK) ਦੀ ਵਰਤੋਂ ਫਸਲ ਦੇ ਪੜਾਅ ਅਨੁਸਾਰ ਕਰੋ। ਝੋਨੇ ਲਈ: 120:60:60 N:P:K ਮਿਆਰੀ ਹੈ। ਯੂਰੀਆ ਨੂੰ ਤਿੰਨ ਬਰਾਬਰ ਹਿੱਸਿਆਂ ਵਿੱਚ ਪਾਓ (ਰੋਪਾਈ, ਕੱਲ੍ਹੇ ਫੁੱਟਣ ਵੇਲੇ, ਅਤੇ ਨਿਸਾਰੇ ਵੇਲੇ)।";
            } else if (msg.contains("weather") || msg.contains("rain") || msg.contains("forecast") || msg.contains("ਮੌਸਮ") || msg.contains("ਮੀਂਹ")) {
                reply = "ਹਮੇਸ਼ਾ 3 ਦਿਨਾਂ ਦੇ ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ ਦੇਖੋ। ਜੇਕਰ ਭਾਰੀ ਮੀਂਹ (>5 ਮਿਲੀਮੀਟਰ) ਦੀ ਸੰਭਾਵਨਾ ਹੈ, ਤਾਂ ਸਿੰਚਾਈ ਅਤੇ ਕੀਟਨਾਸ਼ਕਾਂ ਦਾ ਛਿੜਕਾਅ ਰੋਕ ਦਿਓ ਤਾਂ ਜੋ ਖਾਦ ਜਾਂ ਦਵਾਈ ਖਰਾब ਨਾ ਹੋਵੇ।";
            } else if (msg.contains("yield") || msg.contains("harvest") || msg.contains("optimize") || msg.contains("ਝਾੜ") || msg.contains("ਫਸਲ")) {
                reply = "ਝਾੜ ਵਧਾਉਣ ਲਈ, ਬਿਮਾਰੀ-ਰੋਧਕ ਬੀਜਾਂ (ਜਿਵੇਂ ਕਣਕ ਲਈ HD-2967, ਝੋਨੇ ਲਈ CR-Dhan) ਦੀ ਚੋਣ ਕਰੋ ਅਤੇ ਫਸਲੀ ਚੱਕਰ ਵਿੱਚ ਜੰਤਰ ਜਾਂ ਦਾਲਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ ਤਾਂ ਜੋ ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਬਣੀ ਰਹੇ।";
            } else if (msg.contains("disease") || msg.contains("pest") || msg.contains("insect") || msg.contains("ਬਿਮਾਰੀ") || msg.contains("ਕੀੜੇ")) {
                reply = "ਆਮ ਬਿਮਾਰੀਆਂ ਵਿੱਚ ਝੋਨੇ ਦਾ ਬਲਾਸਟ (Tricyclazole ਨਾਲ ਇਲਾਜ) ਅਤੇ ਕਣਕ ਦੀ ਕੁੰਗੀ (Propiconazole ਨਾਲ ਇਲਾਜ) ਸ਼ਾਮਲ ਹਨ। ਖੇਤ ਵਿੱਚ ਹਵਾ ਅਤੇ ਰੋਸ਼नी ਦਾ ਢੁਕਵਾਂ ਪ੍ਰਬੰਧ ਰੱਖੋ।";
            } else {
                reply = "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਐਗਰੀਸਮਾਰਟ ਏਆਈ ਸਹਾਇਕ ਹਾਂ। ਮੈਨੂੰ ਫਸਲ ਦੀ ਚੋਣ, ਖਾਦਾਂ ਦੀ ਵਰਤੋਂ, ਮੌਸਮ ਦੀ ਚੇਤਾਵਨੀ ਜਾਂ ਝਾੜ ਵਧਾਉਣ ਬਾਰੇ ਪੁੱਛੋ।";
            }
        } else if (lang.equals("ta")) {
            if (msg.contains("fertilizer") || msg.contains("npk") || msg.contains("urea") || msg.contains("fertiliser") || msg.contains("உரம்") || msg.contains("தழைச்சத்து")) {
                reply = "பயிர் வளர்ச்சிக்கு ஏற்ப உரமிடவும் (N:P:K). நெற்பயிருக்கு: 120:60:60 N:P:K உகந்தது. தழைச்சத்தை (நைட்ரஜன்) அடி உரம், தூர்கள் கட்டும் பருவம், மற்றும் பூங்கொத்து உருவாகும் பருவம் என 3 பிரிவாக பிரித்து இடவும்.";
            } else if (msg.contains("weather") || msg.contains("rain") || msg.contains("forecast") || msg.contains("வானிலை") || msg.contains("மழை")) {
                reply = "எப்போதும் 3 நாட்களுக்கான வானிலை முன்னறிவிப்பை கவனிக்கவும். கனமழை (>5 மிமீ) எதிர்பார்க்கப்பட்டால், நீர்ப்பாசனம் மற்றும் பூச்சிக்கொல்லி தெளிப்பதை தள்ளிப்போடவும்.";
            } else if (msg.contains("yield") || msg.contains("harvest") || msg.contains("optimize") || msg.contains("மகசூல்") || msg.contains("அறுவடை")) {
                reply = "அதிக மகசூல் பெற, சான்றளிக்கப்பட்ட நோய் எதிர்ப்பு திறன் கொண்ட விதைகளை தேர்வு செய்யவும். மண்ணின் வளத்தை பெருக்க பயறு வகை பயிர்களுடன் பயிர் சுழற்சி முறை பின்பற்றவும்.";
            } else if (msg.contains("disease") || msg.contains("pest") || msg.contains("insect") || msg.contains("நோய்") || msg.contains("பூச்சி")) {
                reply = "நெற்பயிரில் குலை நோய் (Tricyclazole மூலம் கட்டுப்படுத்தலாம்) மற்றும் கோதுமையில் துரு நோய் (Propiconazole மூலம் கட்டுப்படுத்தலாம்) பொதுவானவை. வடிகால் வசதியை மேம்படுத்தவும்.";
            } else {
                reply = "வணக்கம்! நான் உங்கள் அக்ரிஸ்மார்ட் AI உதவியாளர். பயிர் தேர்வு, உர மேலாண்மை, வானிலை எச்சரிக்கைகள் அல்லது மகசூல் மேம்பாடு பற்றி என்னிடம் கேட்கலாம்.";
            }
        } else {
            // Default English
            if (msg.contains("fertilizer") || msg.contains("npk") || msg.contains("urea") || msg.contains("fertiliser")) {
                reply = "NPK levels should be adjusted depending on crop stage. For rice: 120:60:60 N:P:K is standard. Split nitrogen into 3 doses: basal, tillering, and panicle initiation. Ensure phosphorus is fully applied during sowing.";
            } else if (msg.contains("weather") || msg.contains("rain") || msg.contains("forecast") || msg.contains("monsoon")) {
                reply = "Always monitor 3-day weather forecasts. If heavy rainfall (>5mm) is predicted, defer irrigation and pesticide sprays to prevent chemical wash-off and waterlogging.";
            } else if (msg.contains("yield") || msg.contains("harvest") || msg.contains("optimize") || msg.contains("predict")) {
                reply = "To maximize yields, select certified disease-resistant seeds (e.g., HD-2967 for wheat, CR-Dhan for rice) and practice crop rotation with legumes like mung bean to replenish soil nitrogen.";
            } else if (msg.contains("disease") || msg.contains("pest") || msg.contains("insect") || msg.contains("fungus")) {
                reply = "Common diseases include Blast in rice (treat with Tricyclazole) and Rust in wheat (treat with Propiconazole). Maintain proper drainage and spacing to minimize fungal buildup.";
            } else {
                reply = "Hello! I am your AgriSmart AI assistant. Ask me about crop suitability, NPK fertilizer dosing, weather warnings, or yield optimization.";
            }
        }

        return new ChatbotResponse(reply);
    }
}
