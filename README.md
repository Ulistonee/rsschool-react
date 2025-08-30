# CO₂ Emissions

Приложение для отображения и анализа данных по выбросам CO₂ по странам с возможностью поиска, сортировки, выбора года и добавления дополнительных колонок.

## 🚀 Initial Profiling (до оптимизаций)

Для анализа производительности был использован **React Dev Tools Profiler**.  
Измерения проводились во время следующих действий:

- сортировка колонки;
- поиск страны;
- выбор другого года;
- добавление/удаление колонок.

### 🔎 Результаты профилинга

- **Commit Duration:** ~0.9-1.1 s
- **Render Duration:** до 112ms на отдельные компоненты
- **Interactions:** поиск вызывал ререндер компонента Headers
- **Flame Graph:** желтые зоны у `CountryInfo`
- **Ranked Chart:** в топе по времени рендера был:
    - `CountryInfo`

📸 Скриншоты из Profiler (до оптимизаций):  
![Profiler FlameGraph Before](src/docs/screenshots/search.png)  
![Profiler FlameGraph Before](src/docs/screenshots/select_year.png)  
![Profiler FlameGraph Before](src/docs/screenshots/sort_by_name.png)  
![Profiler FlameGraph Before](src/docs/screenshots/sort_by_population.png)  
![Profiler FlameGraph Before](src/docs/screenshots/render_duration_for_component.png)  
![Profiler Ranked Before](src/docs/screenshots/ranked_chart.png)

---

## ⚡ Optimization with React.memo & useMemo

Для уменьшения ненужных перерисовок были применены оптимизации:

- `React.memo` для компонент:
    - `CountryInfo`
    - `Headers`
    - `SearchBar`
- `useMemo` для мемоизации вычисляемых данных:
    - список лет;
    - список стран по выбранному году;
    - фильтрация и сортировка;
- `useCallback` для функций-обработчиков.

### 🔎 Результаты повторного профилинга

- **Commit Duration:** увеличилось до ~131ms
- **Render Duration:** `Headers` больше не рендерится при поиске, поиск не должен влиять на заголовки колонок
- **Interactions:** число компонентов, реагирующих на действия, уменьшилось
- **Flame Graph:** в принципе желтые зоны у `CountryInfo` остались
- **Ranked Chart:** `CountryInfo` так и остался в топе по времени рендера, как я понимаю

📸 Скриншоты из Profiler (после оптимизаций):  
![Profiler FlameGraph After](src/docs/screenshots/search_after.png)  
![Profiler FlameGraph After](src/docs/screenshots/sort_by_name_after.png)  
![Profiler FlameGraph After](src/docs/screenshots/sort_by_population_after.png)  
![Profiler FlameGraph After](src/docs/screenshots/select_year_after.png)  
![Profiler Ranked After](src/docs/screenshots/ranked_chart_after.png)
![Profiler Ranked After](src/docs/screenshots/headers_after.png)

---

## 📊 Сравнение до и после оптимизаций

| Параметр        | До оптимизации            | После оптимизации            |
|-----------------|---------------------------|------------------------------|
| Commit Duration | 0.9-1.1 s                 | 1.2s                         |
| Render Duration | ~112ms                    | ~131ms                       |
| Flame Graph     | Желтые зоны               | Желтые зоны                  |
| Ranked Chart    | CountryInfo на 1 месте    | CountryInfo на 1 месте       |
| Ranked Chart    | Headers перерендеривается | Headers не перерендеривается |

Применение `React.memo`, `useMemo` и `useCallback` позволило:

- Уменьшить количество ненужных перерисовок.

