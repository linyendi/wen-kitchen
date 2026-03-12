package com.wen;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/api")
public class MenuController {

    @GetMapping("/menu")
    public Map<String, Object> getFullData() {
        Map<String, Object> response = new HashMap<>();

        // 菜單資料
        List<Map<String, Object>> menu = new ArrayList<>();

        // 雞蛋燒系列
        Map<String, Object> eggBurn = new HashMap<>();
        eggBurn.put("category", "雞蛋燒");
        eggBurn.put("items", Arrays.asList(
            createItem("肉鬆起司蛋", 45, "人氣推薦 / 全熟蛋"),
            createItem("只有肉鬆蛋", 40, "全熟蛋"),
            createItem("起司蛋燒", 40, "全熟蛋")
        ));

        // 雞蛋糕系列
        Map<String, Object> eggCake = new HashMap<>();
        eggCake.put("category", "雞蛋糕");
        eggCake.put("items", Arrays.asList(
            createItem("古早味雞蛋糕", 20, "無餡料"),
            createItem("香濃奶酥", 35, ""),
            createItem("醇黑巧OREO", 35, ""),
            createItem("黑糖麻糬", 30, ""),
            createItem("原味卡士達", 30, ""),
            createItem("今日私房口味", null, "請看社群或現場問老闆")
        ));

        // 呷涼的系列
        Map<String, Object> drinks = new HashMap<>();
        drinks.put("category", "呷涼的");
        drinks.put("items", Arrays.asList(
            createItem("甘甜冷泡茶", 25, ""),
            createItem("蜜香紅茶", 25, "")
        ));

        menu.add(eggBurn);
        menu.add(eggCake);
        menu.add(drinks);

        // 商家資訊
        Map<String, String> shopInfo = new HashMap<>();
        shopInfo.put("address", "新北市三重區力行路一段89巷1號");
        shopInfo.put("description", "本店雞蛋糕100%使用純牛奶製作，不使用預拌粉！");
        shopInfo.put("lineNotice", "歡迎線上訂餐");

        response.put("menu", menu);
        response.put("shopInfo", shopInfo);

        return response;
    }

    private Map<String, Object> createItem(String name, Integer price, String note) {
        Map<String, Object> item = new HashMap<>();
        item.put("name", name);
        item.put("price", price);
        item.put("note", note);
        return item;
    }
}
