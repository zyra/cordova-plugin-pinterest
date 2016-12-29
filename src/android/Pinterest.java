package com.zyramedia.cordova.pinterest;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;

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
  private String ACCESS_TOKEN;

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    final Activity activity = cordova.getActivity();

    context = webView.getContext();

    try {
      ApplicationInfo applicationInfo = activity.getPackageManager().getApplicationInfo(activity.getPackageName(), PackageManager.GET_META_DATA);
      final String APP_ID = applicationInfo.metaData.getString("com.zyramedia.cordova.pinterest.APP_ID");
      pdkClient = PDKClient.configureInstance(context, APP_ID);
      pdkClient.onConnect(context);
      PDKClient.setDebugMode(true);
    } catch (PackageManager.NameNotFoundException e) {
      Log.d(TAG, e.getMessage());
    } catch (NullPointerException e) {
      Log.d(TAG, e.getMessage());
    }

    cordova.setActivityResultCallback(this);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    if (requestCode == 8772) {
      String response = intent.getStringExtra("PDKCLIENT_EXTRA_RESULT");
      Uri parsedResponse = Uri.parse(response);
      ACCESS_TOKEN = parsedResponse.getQueryParameter("access_token");
      pdkClient.onOauthResponse(requestCode, resultCode, intent);
    }
  }

  @Override
  public void onNewIntent(Intent intent) {
    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    Log.d(TAG, "New intent");
    final String result = intent.getData().toString();
    intent.putExtra("PDKCLIENT_EXTRA_RESULT", result);
    pdkClient.onOauthResponse(8772, -1, intent);
    ACCESS_TOKEN = intent.getData().getQueryParameter("access_token");
  }

  @Override
  public boolean execute(final String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

    final PDKCallback _callback = getCallback(callbackContext);

    try {
      // Methods without fields param
      if (action.equals("login")) {

        login(args, callbackContext);
        return true;

      } else if(action.equals("deleteBoard")) {

        pdkClient.deleteBoard(args.getString(0), _callback);
        return true;

      } else if(action.equals("createBoard")) {

        pdkClient.createBoard(args.getString(0), args.getString(1), _callback);
        return true;

      } else if(action.equals("deletePin")) {

        pdkClient.deletePin(args.getString(0), _callback);
        return true;

      } else if(action.equals("createPin")) {

        pdkClient.createPin(args.getString(0), args.getString(1), args.getString(2), args.getString(3), _callback);
        return true;

      }


      // Methods with fields param

      String fields = null;

      if (args.length() > 0) {
        fields = args.getString(0);
      }

      if (action.equals("getMe")) {

        pdkClient.getMe(fields, _callback);

      } else if (action.equals("getMyPins")) {

        pdkClient.getMyPins(fields, _callback);

      } else if (action.equals("getMyBoards")) {

        pdkClient.getMyBoards(fields, _callback);

      } else if (action.equals("getMyLikes")) {

        pdkClient.getMyLikes(fields, _callback);

      } else if (action.equals("getMyFollowers")) {

        pdkClient.getMyFollowers(fields, _callback);

      } else if (action.equals("getMyFollowedBoards")) {

        pdkClient.getMyFollowedBoards(fields, _callback);

      } else if (action.equals("getMyFollowedInterests")) {

        pdkClient.getMyFollowedInterests(fields, _callback);

      } else if (action.equals("getUser")) {

        pdkClient.getUser(args.getString(1), fields, _callback);

      } else if (action.equals("getBoard")) {

        pdkClient.getBoard(args.getString(1), fields, _callback);

      } else if (action.equals("getBoardPins")) {

        pdkClient.getBoardPins(args.getString(1), fields, _callback);

      } else if (action.equals("getPin")) {

        pdkClient.getPin(args.getString(1), fields, _callback);

      } else {

        return false;

      }
    } catch (JSONException e) {
      callbackContext.error(e.getMessage());
    }

    return true;

  }

  private PDKCallback getCallback(final CallbackContext callbackContext) {
    return new PDKCallback() {
      @Override
      public void onSuccess(PDKResponse response) {
        if (response.getData() instanceof JSONArray) {
          callbackContext.success((JSONArray) response.getData());
        } else if(response.getData() instanceof JSONObject) {
          callbackContext.success((JSONObject) response.getData());
        } else {
          try {
            JSONObject res = new JSONObject(response.getData().toString());
            callbackContext.success(res);
          } catch (JSONException e) {
            callbackContext.error(e.getMessage());
          }
        }
      }
      @Override
      public void onFailure(PDKException exception) {
        Log.d(TAG, "CALLBACK ERROR");
        Log.e(TAG, exception.getDetailMessage());
        try {
          callbackContext.error(new JSONObject(exception.getDetailMessage()));
        } catch (JSONException e){
          callbackContext.error(exception.getDetailMessage());
        }
      }
    };
  }

  private void login(JSONArray jsonScopes, final CallbackContext callbackContext) {
    final List<String> scopes = new ArrayList<String>();

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

      cordova.getThreadPool().execute(new Runnable() {
        @Override
        public void run() {
          pdkClient.login(context, scopes, new PDKCallback() {
            @Override
            public void onSuccess(PDKResponse response) {
              Log.d(TAG, response.getData().toString());
              try {
                JSONObject res = new JSONObject(response.getData().toString());

                if (ACCESS_TOKEN != null) {
                  res.put("access_token", ACCESS_TOKEN);
                }

                callbackContext.success(res);
              } catch (JSONException e) {
                callbackContext.error(e.getMessage());
              }
            }

            @Override
            public void onFailure(PDKException exception) {
              Log.e(TAG, exception.getDetailMessage());
              callbackContext.error(exception.getDetailMessage());
            }
          });
        }
      });

    } catch (JSONException e) {
      Log.d(TAG, e.getMessage());
    }

  }

}
