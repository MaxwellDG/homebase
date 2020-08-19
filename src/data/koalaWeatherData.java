package com.example.thebushland;

import android.content.Context;
import android.content.Intent;
import androidx.databinding.DataBindingUtil;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.text.method.LinkMovementMethod;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.thebushland.databinding.ActivityWeatherBinding;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Weather extends AppCompatActivity {

    private OkHttpClient client = new OkHttpClient();
    private Button forecastButton;
    private HourlyWeather[] theForecast;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityWeatherBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_weather);

        String URL = "https://api.darksky.net/forecast/14869e5a43df1a312c2e8801f2070667/43.6532,-79.3832";
        Request request = new Request.Builder().url(URL).build();

        TextView darkSkyLegal = findViewById(R.id.legalText);
        darkSkyLegal.setMovementMethod(LinkMovementMethod.getInstance());

        forecastButton = findViewById(R.id.forecastButton);
        forecastButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startWeatherForecast();
            }
        });


        if (isNetworkAvailable()) {
            Call call = client.newCall(request);
            call.enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException ioe) {
                    ioe.printStackTrace();
                }

                @Override
                public void onResponse(Call call, Response response) {
                    try {
                        String jsonData = response.body().string();
                        if (response.isSuccessful()) {
                            Forecast forecast = new Forecast();

                            forecast.setTotalWeatherInfo(getDetails(jsonData));
                            forecast.setAllTheHours(getHourlyDetails(jsonData));

                            theForecast = forecast.getAllTheHours();

                            WeatherInfo someInfo = forecast.getTotalWeatherInfo();
                            someInfo.getDERFormattedTime();

                            WeatherInfo displayWeatherInfo = new WeatherInfo(someInfo.getTemperature(),
                                    someInfo.getLocation(), someInfo.getPrecipitationChance(),
                                    someInfo.getWindSpeed(), someInfo.getWeatherConditions(),
                                    someInfo.getWeatherConditionsId(), someInfo.getFormattedTime());
                            binding.setWeather(displayWeatherInfo);

                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    ImageView icon = findViewById(R.id.weatherIcon);
                                    icon.setImageResource(displayWeatherInfo.getWeatherConditionsId());
                                }
                            });
                            } else {
                                alertErrorMessage();
                        }
                    } catch (IOException ioe) {
                        ioe.printStackTrace();
                    } catch (NullPointerException npe) {
                        npe.printStackTrace();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });
        }
        }
        private boolean isNetworkAvailable(){
            ConnectivityManager manager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = manager.getActiveNetworkInfo();

            boolean isAvailable = false;
            if (networkInfo != null && networkInfo.isConnected()){
                isAvailable = true;
            }
            return isAvailable;
        }

        private void alertErrorMessage(){
            Toast.makeText(this,
                    "Woops, there was a network problem.", Toast.LENGTH_LONG).show();
        }

        private WeatherInfo getDetails(String jsonData){
            WeatherInfo infoTransfer = new WeatherInfo();
        try {
            JSONObject data = new JSONObject(jsonData);
            JSONObject currently = data.getJSONObject("currently");

            infoTransfer.setTemperature(currently.getDouble("temperature"));
            infoTransfer.setPrecipitationChance(currently.getDouble("precipProbability"));
            infoTransfer.setLocation(data.getString("timezone"));
            infoTransfer.setWindSpeed(currently.getDouble("windSpeed"));
            infoTransfer.setTime(currently.getLong("time"));
            infoTransfer.setWeatherConditions(currently.getString("icon"));
        } catch (JSONException je){
            je.printStackTrace();
        }
        return infoTransfer;
        }

        private HourlyWeather[] getHourlyDetails(String jsonData) throws JSONException {
            JSONObject allOfIt = new JSONObject(jsonData);
            JSONObject hourlyData = allOfIt.getJSONObject("hourly");
            JSONArray theHourlyData = hourlyData.getJSONArray("data");

            HourlyWeather[] combineAllTheHours = new HourlyWeather[theHourlyData.length()];

            for (int i = 0; i < theHourlyData.length(); i++) {
                JSONObject finallyTheData = theHourlyData.getJSONObject(i);

                HourlyWeather oneHourAtATime = new HourlyWeather();
                oneHourAtATime.setSummary(finallyTheData.getString("icon"));
                oneHourAtATime.setLocation(allOfIt.getString("timezone"));
                oneHourAtATime.setTemperature(finallyTheData.getString("temperature"));
                oneHourAtATime.setTime(finallyTheData.getLong("time"));

                combineAllTheHours[i] = oneHourAtATime;
            }
            return combineAllTheHours;
        }

        private void startWeatherForecast(){
            List<HourlyWeather> infoList = Arrays.asList(theForecast);
            Intent intent = new Intent(this, WeatherForecast.class);
            intent.putExtra("allTheForecastData", (Serializable) infoList);
            startActivity(intent);
        }
}