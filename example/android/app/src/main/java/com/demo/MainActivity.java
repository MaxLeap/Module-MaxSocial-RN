package com.demo;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.maxleap.reactnative.MLInAppSocialReactPackage;
import com.maxleap.social.MLHermes;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    private String APP_ID = "574ff56a169e7d0001a56008";
    private String API_KEY = "VHV0TlRnVzB3OFhBdDVQc0E2RnVUUQ";

    // private String APP_ID = "56a04b91a5ff7f0001c46a11";
    // private String API_KEY = "LXJlT2daS0tNZWxMWUFUTnh4MlBCZw";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        MLHermes.initialize(this, APP_ID, API_KEY);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "demo";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new MLInAppSocialReactPackage()
        );
    }
}
