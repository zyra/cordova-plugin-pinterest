package com.zyramedia.cordova.pinterest;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import com.pinterest.android.pdk.PDKCallback;
import com.pinterest.android.pdk.PDKClient;
import com.pinterest.android.pdk.PDKException;
import com.pinterest.android.pdk.PDKResponse;

import java.util.ArrayList;
import java.util.List;

public class Pinterest extends CordovaPlugin {

    private static final String TAG = "PinterestCordovaPlugin";
    private PDKClient pdkClient;
    private Context context;
    private Activity activity;
    private String APP_ID;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        Log.d(TAG, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Hello world");

        this.context = webView.getContext();
        activity = cordova.getActivity();

        try {
            ApplicationInfo applicationInfo = activity.getPackageManager().getApplicationInfo(activity.getPackageName(), PackageManager.GET_META_DATA);
            APP_ID = applicationInfo.metaData.getString("com.zyramedia.cordova.pinterest.APP_ID");
        } catch (PackageManager.NameNotFoundException e) {
            Log.d(TAG, e.getMessage());
        } catch (NullPointerException e) {
            Log.d(TAG, e.getMessage());
        }

        pdkClient = PDKClient.configureInstance(context, "4852632033488291014");
        PDKClient.getInstance().onConnect(context);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals("login")) {
            login(args, callbackContext);
        } else {
            return false;
        }

        return true;
    }

    private void login(JSONArray jsonScopes, final CallbackContext callbackContext) {
        List scopes = new ArrayList<String>();

        Log.d(TAG, jsonScopes.toString());

        try {
            if (jsonScopes.length() > 0) {
                Log.d(TAG, "jsonScopes exists, and there are " + jsonScopes.length() + " of them");
                int len = jsonScopes.length();
                for (int i=0; i<len; i++) {
                    scopes.add(jsonScopes.get(i).toString());
                }
            } else {
                Log.d(TAG, "jsonScopes do not exist");
                scopes.add(PDKClient.PDKCLIENT_PERMISSION_READ_PUBLIC);
                scopes.add(PDKClient.PDKCLIENT_PERMISSION_WRITE_PUBLIC);
            }

            cordova.setActivityResultCallback(this);
            cordova.getActivity().startActivityForResult();

            pdkClient.login(context, scopes, new PDKCallback() {
                @Override
                public void onSuccess(PDKResponse response) {
                    Log.d(TAG, response.getData().toString());
                    try {
                        JSONObject res = new JSONObject(response.getData().toString());
                        callbackContext.success(res);
                    } catch (JSONException e) {
                        callbackContext.error(e.getMessage());
                    }
                    //user logged in, use response.getUser() to get PDKUser object
                }

                @Override
                public void onFailure(PDKException exception) {
                    Log.e(TAG, exception.getDetailMessage());
                    callbackContext.error(exception.getDetailMessage());
                }
            });

        } catch (JSONException e) {
            Log.d(TAG, e.getMessage());
        }



    }

}