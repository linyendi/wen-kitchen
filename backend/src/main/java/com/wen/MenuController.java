package com.wen;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // 讓前端 Vercel 順利讀取資料
public class MenuController {

    @GetMapping("/menu")
    public Map<String, Object> getFullData() {
        Map<String, Object> response = new HashMap<>();

        // 1. 菜單資料
        List<Map<String, Object>> menu = new ArrayList<>();

        // --- 雞蛋燒系列 (新增 options 欄位) ---
        List<Map<String, Object>> eggBurnItems = new ArrayList<>();
        eggBurnItems.add(createItem("肉鬆起司蛋", 45, "人氣推薦", Arrays.asList("全熟蛋")));
        eggBurnItems.add(createItem("只有肉鬆蛋", 40, "", Arrays.asList("全熟蛋")));
        eggBurnItems.add(createItem("起司蛋燒", 40, "", Arrays.asList("全熟蛋")));
        
        menu.add(createCategory("雞蛋燒", eggBurnItems));

        // --- 雞蛋糕系列 ---
        List<Map<String, Object>> eggCakeItems = new ArrayList<>();
        eggCakeItems.add(createItem("古早味雞蛋糕", 20, "無餡料", null));
        eggCakeItems.add(createItem("香濃奶酥", 35, "", null));
        eggCakeItems.add(createItem("醇黑巧OREO", 35, "", null));
        eggCakeItems.add(createItem("黑糖麻糬", 30, "", null));
        eggCakeItems.add(createItem("原味卡士達", 30, "", null));
        eggCakeItems.add(createItem("今日私房口味", null, "請看社群或現場問老闆", null));

        menu.add(createCategory("雞蛋糕", eggCakeItems));

        // --- 呷涼的系列 ---
        List<Map<String, Object>> drinksItems = new ArrayList<>();
        drinksItems.add(createItem("甘甜冷泡茶", 25, "", null));
        drinksItems.add(createItem("蜜香紅茶", 25, "", null));

        menu.add(createCategory("呷涼的", drinksItems));

        // 2. 商家資訊
        Map<String, String> shopInfo = new HashMap<>();
        shopInfo.put("address", "新北市三重區力行路一段89巷1號");
        shopInfo.put("description", "本店雞蛋糕100%使用純牛奶製作，不使用預拌粉！");
        shopInfo.put("lineNotice", "歡迎線上訂餐");

        response.put("menu", menu);
        response.put("shopInfo", shopInfo);

        return response;
    }

    private Map<String, Object> createCategory(String name, List<Map<String, Object>> items) {
        Map<String, Object> category = new HashMap<>();
        category.put("category", name);
        category.put("items", items);
        return category;
    }

    // 更新 createItem 方法，加入 options
    private Map<String, Object> createItem(String name, Integer price, String note, List<String> options) {
        Map<String, Object> item = new HashMap<>();
        item.put("name", name);
        item.put("price", price);
        item.put("note", note);
        item.put("options", options); // 新增這行
        return item;
    }
}
