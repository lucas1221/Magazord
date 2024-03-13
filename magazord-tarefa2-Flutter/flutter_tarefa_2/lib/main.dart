import 'package:flutter/material.dart';
import 'weather_api.dart';

void main() {
  runApp(const AppPrincipal());
}

class AppPrincipal extends StatelessWidget {
  const AppPrincipal({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: TelaClima(),
    );
  }
}

class TelaClima extends StatefulWidget {
  @override
  _TelaClimaState createState() => _TelaClimaState();
}

class _TelaClimaState extends State<TelaClima> {
  double lat = -25.4284;
  double lon = -49.2733;
  Map<String, dynamic>? dadosClima;

  @override
  void initState() {
    super.initState();
    buscarDadosClima();
  }

  void buscarDadosClima() async {
    try {
      dadosClima = await obterClimaPorCoordenadas(lat, lon);
      setState(() {});
    } catch (e) {
      print('Falha ao obter dados de clima: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: dadosClima == null
          ? Center(child: CircularProgressIndicator())
          : Center(
              child: Container(
                width: 300,
                height: 400,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 5,
                      blurRadius: 7,
                      offset: Offset(0, 3),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      'Cidade: ${dadosClima!['name']}',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 20),
                    dadosClima!['weather'][0]['icon'] != null
                        ? Image.network(
                            'http://openweathermap.org/img/w/${dadosClima!['weather'][0]['icon']}.png',
                            width: 150, // Aumente o tamanho do ícone
                            height: 150, // Aumente o tamanho do ícone
                          )
                        : CircularProgressIndicator(),
                    SizedBox(height: 20),
                    Text(
                      'Temperatura: ${dadosClima!['main']['temp']}°C',
                      style: TextStyle(fontSize: 20),
                    ),
                    SizedBox(height: 10),
                    Text(
                      'Condição: ${dadosClima!['weather'][0]['description']}',
                      style: TextStyle(fontSize: 20),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}






