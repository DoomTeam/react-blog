package com.react_blog;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.app.Activity.RESULT_OK;

/**
 * Created by guozhen.hou on 2018/5/4.
 */

public class ExampleInterface extends ReactContextBaseJavaModule {
    public static final String TAG_REACT="tag_react";
    private ReactApplicationContext context;
    public ExampleInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context=reactContext;
        context.addActivityEventListener(new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if(requestCode!=101||resultCode!=RESULT_OK||data==null)return;
                sendMessage(data.getStringExtra("what"));
            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        });
    }

    private void sendMessage(String msg){
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRnMessage",msg);
    }

    @Override
    public String getName() {
        return "ExampleInterface";
    }

    @ReactMethod
    public void logValue(String value){
        Log.i(TAG_REACT,"get message from rn"+value);
        Intent intent=new Intent(context,MyActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivityForResult(intent,102,null);
    }



}
