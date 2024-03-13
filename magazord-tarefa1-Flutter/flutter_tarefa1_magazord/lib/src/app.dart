// app.dart
import 'package:flutter/material.dart';
import 'settings/settings_controller.dart';
import 'sample_feature/sample_item_list_view.dart'; 

class MyApp extends StatelessWidget {
  const MyApp({
    super.key,
    required this.settingsController,
  });

  final SettingsController settingsController;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lista de Tarefas',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SampleItemListView(), 
    );
  }
}


