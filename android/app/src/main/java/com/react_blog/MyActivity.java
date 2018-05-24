package com.react_blog;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.View;

import static com.react_blog.ExampleInterface.TAG_REACT;

/**
 * Created by guozhen.hou on 2018/5/4.
 */

public class MyActivity extends Activity{
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_main);
        Log.i(TAG_REACT,"页面启动");
        findViewById(R.id.tx_ys).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent();
                intent.putExtra("what","啟動而已");
                setResult(RESULT_OK,intent);
                finish();
            }
        });
    }
}
