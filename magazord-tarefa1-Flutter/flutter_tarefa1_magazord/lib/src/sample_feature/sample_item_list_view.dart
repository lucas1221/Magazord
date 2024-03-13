// sample_item_list_view.dart
import 'package:flutter/material.dart';
import 'sample_item.dart';

class SampleItemListView extends StatefulWidget {
  @override
  _SampleItemListViewState createState() => _SampleItemListViewState();
}

class _SampleItemListViewState extends State<SampleItemListView> {
  List<SampleItem> tasks = [
    SampleItem(id: 1, title: "Tarefa 1", description: "Descrição da Tarefa 1"),
    SampleItem(id: 2, title: "Tarefa 2", description: "Descrição da Tarefa 2", completed: true),
    SampleItem(id: 3, title: "Tarefa 3", description: "Descrição da Tarefa 3", completed: true),
    SampleItem(id: 4, title: "Tarefa 4", description: "Descrição da Tarefa 4", completed: true),
    SampleItem(id: 5, title: "Tarefa 5", description: "Descrição da Tarefa 5", completed: true),
    SampleItem(id: 6, title: "Tarefa 6", description: "Descrição da Tarefa 6", completed: true),
    // ... adicione mais tarefas conforme necessário
  ];

@override
Widget build(BuildContext context) {
  return ListView.builder(
    itemCount: tasks.length,
    itemBuilder: (context, index) {
      return Material(
        elevation: 5.0, 
        borderRadius: BorderRadius.circular(10.0), 
        child: ListTile(
          tileColor: tasks[index].completed ? Colors.green[100] : Colors.red[100], 
          title: Text(
            tasks[index].title,
            style: TextStyle(
              fontWeight: FontWeight.bold, 
              color: tasks[index].completed ? Colors.green : Colors.red, 
            ),
          ),
          subtitle: Text(tasks[index].description),
          trailing: Checkbox(
            value: tasks[index].completed,
            onChanged: (bool? value) {
              setState(() {
                tasks[index].completed = value!;
              });
            },
          ),
        ),
      );
    },
  );
}

}


